/**
 * Conexão com o WhatsApp
 * 
 * Gerencia a conexão com o WhatsApp
 * 
 * @author Anthony
 */

import path from "path";
import { question, onlyNumbers } from "./utils";
import {
  default as makeWASocket,
  DisconnectReason,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  isJidBroadcast,
  isJidStatusBroadcast,
  proto,
  makeInMemoryStore,
  isJidNewsletter,
} from "baileys";
import { NodeCache } from "@cacheable/node-cache";
import pino from "pino";
// @ts-ignore
import { load } from "./loader";
import {
  warningLog,
  infoLog,
  errorLog,
  sayLog,
  successLog,
} from "./utils/logger";
import { WaBotClient } from "./types/baileys";

const msgRetryCounterCache = new NodeCache();

const store = makeInMemoryStore({
  logger: pino().child({ level: "silent", stream: "store" }),
});

const getMessage = async (key: any): Promise<proto.IMessage | undefined> => {
  if (!store) {
    return proto.Message.fromObject({});
  }

  const msg = await store.loadMessage(key.remoteJid || "", key.id || "");

  return msg?.message || undefined;
};

interface BaileysError extends Error {
  output?: {
    statusCode?: number;
  };
}

export async function connect(): Promise<WaBotClient> {
  const { state, saveCreds } = await useMultiFileAuthState(
    path.resolve(__dirname, "..", "assets", "auth", "baileys")
  );

  const { version } = await fetchLatestBaileysVersion();

  // @ts-ignore
  const socket: WaBotClient = makeWASocket({
    version,
    logger: pino({ level: "error" }),
    printQRInTerminal: false,
    defaultQueryTimeoutMs: 60 * 1000,
    auth: state,
    shouldIgnoreJid: (jid: string) =>
      isJidBroadcast(jid) || isJidStatusBroadcast(jid) || isJidNewsletter(jid),
    keepAliveIntervalMs: 60 * 1000,
    markOnlineOnConnect: true,
    msgRetryCounterCache,
    shouldSyncHistoryMessage: () => false,
    getMessage,
  });

  // Implementando os métodos personalizados do cliente
  
  // @ts-ignore - A tipagem do Baileys é complexa, mas a funcionalidade funciona conforme esperado
  socket.sendText = async (jid, text, quoted) => {
    // @ts-ignore
    return await socket.sendMessage(jid, { text }, { quoted });
  };

  // @ts-ignore - A tipagem do Baileys é complexa, mas a funcionalidade funciona conforme esperado
  socket.reply = async (jid, text, quoted) => {
    // @ts-ignore
    return await socket.sendMessage(jid, { text }, { quoted });
  };

  // @ts-ignore - A tipagem do Baileys é complexa, mas a funcionalidade funciona conforme esperado
  socket.sendImage = async (jid, url, caption, quoted) => {
    // @ts-ignore
    return await socket.sendMessage(jid, { image: { url }, caption }, { quoted });
  };

  // @ts-ignore - A tipagem do Baileys é complexa, mas a funcionalidade funciona conforme esperado
  socket.sendAudio = async (jid, url, quoted) => {
    // @ts-ignore
    return await socket.sendMessage(jid, { audio: { url }, mimetype: 'audio/mp4' }, { quoted });
  };

  // @ts-ignore - A tipagem do Baileys é complexa, mas a funcionalidade funciona conforme esperado
  socket.sendVideo = async (jid, url, caption, quoted) => {
    // @ts-ignore
    return await socket.sendMessage(jid, { video: { url }, caption }, { quoted });
  };

  // @ts-ignore - A tipagem do Baileys é complexa, mas a funcionalidade funciona conforme esperado
  socket.sendSticker = async (jid, url, quoted) => {
    // @ts-ignore
    return await socket.sendMessage(jid, { sticker: { url } }, { quoted });
  };

  if (!socket.authState.creds.registered) {
    warningLog("Credenciais ainda não configuradas!");

    infoLog('Informe o número de telefone do bot (exemplo: "5511920202020"):');

    const phoneNumber = await question("Informe o número de telefone do bot: ");

    if (!phoneNumber) {
      errorLog(
        'Número de telefone inválido! Tente novamente com o comando "npm start".'
      );

      process.exit(1);
    }

    const code = await socket.requestPairingCode(onlyNumbers(phoneNumber));

    sayLog(`Código de pareamento: ${code}`);
  }

  socket.ev.on("connection.update", async (update: any) => {
    const { connection, lastDisconnect } = update;

    if (connection === "close") {
      const error = lastDisconnect?.error as BaileysError;
      const statusCode = error?.output?.statusCode;
      
      const isLoggedOut = statusCode === DisconnectReason.loggedOut;

      if (isLoggedOut) {
        errorLog("Bot desconectado!");
      } else {
        if (statusCode) {
          switch (statusCode) {
            case DisconnectReason.badSession:
              warningLog("Sessão inválida!");
              break;
            case DisconnectReason.connectionClosed:
              warningLog("Conexão fechada!");
              break;
            case DisconnectReason.connectionLost:
              warningLog("Conexão perdida!");
              break;
            case DisconnectReason.connectionReplaced:
              warningLog("Conexão substituída!");
              break;
            case DisconnectReason.multideviceMismatch:
              warningLog("Dispositivo incompatível!");
              break;
            case DisconnectReason.forbidden:
              warningLog("Conexão proibida!");
              break;
            case DisconnectReason.restartRequired:
              infoLog('Me reinicie por favor! Digite "npm start".');
              break;
            case DisconnectReason.unavailableService:
              warningLog("Serviço indisponível!");
              break;
          }
        }

        const newSocket = await connect();
        load(newSocket);
      }
    } else if (connection === "open") {
      successLog("Fui conectado com sucesso!");
    } else {
      infoLog("Atualizando conexão...");
    }
  });

  socket.ev.on("creds.update", saveCreds);

  return socket;
} 