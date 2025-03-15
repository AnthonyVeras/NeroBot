/**
 * Funções comuns de uso geral
 * do bot. Não há
 * necessidade de modificar
 * este arquivo.
 *
 * @author Anthony
 */
import { BOT_EMOJI } from "../config";
import { extractDataFromMessage, baileysIs, download } from ".";
import { waitMessage } from "./messages";
import fs from "fs";
import { WaBotClient, WaBotMessage } from "../types/baileys";
import { proto } from "baileys";

interface LoadCommonFunctionsParams {
  socket: WaBotClient;
  webMessage: WaBotMessage;
}

interface CommonFunctions {
  args: string[];
  commandName: string | null;
  fullArgs: string | null;
  fullMessage: string | null;
  isImage: boolean;
  isReply: boolean;
  isSticker: boolean;
  isVideo: boolean;
  prefix: string | null;
  remoteJid: string | null;
  replyJid: string | null;
  socket: WaBotClient;
  userJid: string | null;
  webMessage: WaBotMessage;
  downloadImage: (webMessage: WaBotMessage, fileName: string) => Promise<string | null>;
  downloadSticker: (webMessage: WaBotMessage, fileName: string) => Promise<string | null>;
  downloadVideo: (webMessage: WaBotMessage, fileName: string) => Promise<string | null>;
  sendAudioFromURL: (url: string) => Promise<proto.WebMessageInfo | undefined>;
  sendErrorReact: () => Promise<proto.WebMessageInfo | undefined>;
  sendErrorReply: (text: string) => Promise<proto.WebMessageInfo | undefined>;
  sendImageFromFile: (file: string, caption?: string) => Promise<proto.WebMessageInfo | undefined>;
  sendImageFromURL: (url: string, caption?: string) => Promise<proto.WebMessageInfo | undefined>;
  sendReact: (emoji: string) => Promise<proto.WebMessageInfo | undefined>;
  sendReply: (text: string) => Promise<proto.WebMessageInfo | undefined>;
  sendStickerFromFile: (file: string) => Promise<proto.WebMessageInfo | undefined>;
  sendStickerFromURL: (url: string) => Promise<proto.WebMessageInfo | undefined>;
  sendSuccessReact: () => Promise<proto.WebMessageInfo | undefined>;
  sendSuccessReply: (text: string) => Promise<proto.WebMessageInfo | undefined>;
  sendText: (text: string, mentions?: string[]) => Promise<proto.WebMessageInfo | undefined>;
  sendVideoFromURL: (url: string) => Promise<proto.WebMessageInfo | undefined>;
  sendWaitReact: () => Promise<proto.WebMessageInfo | undefined>;
  sendWaitReply: (text?: string) => Promise<proto.WebMessageInfo | undefined>;
  sendWarningReact: () => Promise<proto.WebMessageInfo | undefined>;
  sendWarningReply: (text: string) => Promise<proto.WebMessageInfo | undefined>;
}

export const loadCommonFunctions = ({ socket, webMessage }: LoadCommonFunctionsParams): CommonFunctions | null => {
  const {
    args,
    commandName,
    fullArgs,
    fullMessage,
    isReply,
    prefix,
    remoteJid,
    replyJid,
    userJid,
  } = extractDataFromMessage(webMessage);

  if (!remoteJid) {
    return null;
  }

  // Adaptando para o tipo WaBotMessage para garantir compatibilidade
  const message = webMessage as WaBotMessage;

  const isImage = baileysIs(message, "image");
  const isVideo = baileysIs(message, "video");
  const isSticker = baileysIs(message, "sticker");

  const downloadImage = async (webMessage: WaBotMessage, fileName: string): Promise<string | null> => {
    return await download(webMessage, fileName, "image", "png");
  };

  const downloadSticker = async (webMessage: WaBotMessage, fileName: string): Promise<string | null> => {
    return await download(webMessage, fileName, "sticker", "webp");
  };

  const downloadVideo = async (webMessage: WaBotMessage, fileName: string): Promise<string | null> => {
    return await download(webMessage, fileName, "video", "mp4");
  };

  const sendText = async (text: string, mentions?: string[]): Promise<proto.WebMessageInfo | undefined> => {
    let optionalParams = {};

    if (mentions?.length) {
      optionalParams = { mentions };
    }

    return await socket.sendMessage(remoteJid, {
      text: `${BOT_EMOJI} ${text}`,
      ...optionalParams,
    });
  };

  const sendReply = async (text: string): Promise<proto.WebMessageInfo | undefined> => {
    return await socket.sendMessage(
      remoteJid,
      { text: `${BOT_EMOJI} ${text}` },
      { quoted: message }
    );
  };

  const sendReact = async (emoji: string): Promise<proto.WebMessageInfo | undefined> => {
    if (!message.key) return;
    
    return await socket.sendMessage(remoteJid, {
      react: {
        text: emoji,
        key: message.key,
      },
    });
  };

  const sendSuccessReact = async (): Promise<proto.WebMessageInfo | undefined> => {
    return await sendReact("✅");
  };

  const sendWaitReact = async (): Promise<proto.WebMessageInfo | undefined> => {
    return await sendReact("⏳");
  };

  const sendWarningReact = async (): Promise<proto.WebMessageInfo | undefined> => {
    return await sendReact("⚠️");
  };

  const sendErrorReact = async (): Promise<proto.WebMessageInfo | undefined> => {
    return await sendReact("❌");
  };

  const sendSuccessReply = async (text: string): Promise<proto.WebMessageInfo | undefined> => {
    await sendSuccessReact();
    return await sendReply(`✅ ${text}`);
  };

  const sendWaitReply = async (text?: string): Promise<proto.WebMessageInfo | undefined> => {
    await sendWaitReact();
    return await sendReply(`⏳ Aguarde! ${text || waitMessage}`);
  };

  const sendWarningReply = async (text: string): Promise<proto.WebMessageInfo | undefined> => {
    await sendWarningReact();
    return await sendReply(`⚠️ Atenção! ${text}`);
  };

  const sendErrorReply = async (text: string): Promise<proto.WebMessageInfo | undefined> => {
    await sendErrorReact();
    return await sendReply(`❌ Erro! ${text}`);
  };

  const sendStickerFromFile = async (file: string): Promise<proto.WebMessageInfo | undefined> => {
    return await socket.sendMessage(
      remoteJid,
      {
        sticker: fs.readFileSync(file),
      },
      { quoted: message }
    );
  };

  const sendStickerFromURL = async (url: string): Promise<proto.WebMessageInfo | undefined> => {
    return await socket.sendMessage(
      remoteJid,
      {
        sticker: { url },
      },
      { quoted: message }
    );
  };

  const sendImageFromFile = async (file: string, caption: string = ""): Promise<proto.WebMessageInfo | undefined> => {
    if (!fs.existsSync(file)) {
      return;
    }

    return await socket.sendMessage(
      remoteJid,
      {
        image: fs.readFileSync(file),
        caption: caption ? `${BOT_EMOJI} ${caption}` : "",
      },
      { quoted: message }
    );
  };

  const sendImageFromURL = async (url: string, caption: string = ""): Promise<proto.WebMessageInfo | undefined> => {
    return await socket.sendMessage(
      remoteJid,
      {
        image: { url },
        caption: caption ? `${BOT_EMOJI} ${caption}` : "",
      },
      { quoted: message }
    );
  };

  const sendAudioFromURL = async (url: string): Promise<proto.WebMessageInfo | undefined> => {
    return await socket.sendMessage(
      remoteJid,
      {
        audio: { url },
        mimetype: "audio/mp4",
      },
      { quoted: message }
    );
  };

  const sendVideoFromURL = async (url: string): Promise<proto.WebMessageInfo | undefined> => {
    return await socket.sendMessage(
      remoteJid,
      {
        video: { url },
      },
      { quoted: message }
    );
  };

  return {
    args,
    commandName,
    fullArgs,
    fullMessage,
    isImage,
    isReply,
    isSticker,
    isVideo,
    prefix,
    remoteJid,
    replyJid,
    socket,
    userJid,
    webMessage: message,
    downloadImage,
    downloadSticker,
    downloadVideo,
    sendAudioFromURL,
    sendErrorReact,
    sendErrorReply,
    sendImageFromFile,
    sendImageFromURL,
    sendReact,
    sendReply,
    sendStickerFromFile,
    sendStickerFromURL,
    sendSuccessReact,
    sendSuccessReply,
    sendText,
    sendVideoFromURL,
    sendWaitReact,
    sendWaitReply,
    sendWarningReact,
    sendWarningReply,
  };
}; 