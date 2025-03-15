/**
 * Funções diversas.
 *
 * @author Anthony
 */
import { downloadContentFromMessage } from "baileys";
import { PREFIX, COMMANDS_DIR, TEMP_DIR } from "../config";
import path from "path";
import fs from "fs";
import { writeFile } from "fs/promises";
import readline from "node:readline";
import axios, { AxiosRequestConfig } from "axios";
import { WaBotMessage } from "../types/baileys";
import { Command, CommandImport } from "../types/commands";

// Importações de submódulos
export * from './logger';
export * from './messages';

// Tipos de conteúdos suportados pelo Baileys para download
type BaileysContentType = 
  | "image" 
  | "video" 
  | "audio" 
  | "sticker" 
  | "document" 
  | "gif" 
  | "ptt"
  | "product";

export interface ExtractedMessageData {
  args: string[];
  commandName: string | null;
  fullArgs: string | null;
  fullMessage: string | null;
  isReply: boolean;
  prefix: string | null;
  remoteJid: string | null;
  replyJid: string | null;
  userJid: string | null;
}

export interface FindCommandResult {
  type: string;
  command: Command | null;
}

export const question = (message: string): Promise<string> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => rl.question(message, resolve));
};

/**
 * Converte um número de telefone para o formato JID do WhatsApp
 * 
 * @param phoneNumber Número de telefone (com ou sem @s.whatsapp.net)
 * @returns Número formatado como JID do WhatsApp
 */
export const toUserJid = (number: string): string => `${onlyNumbers(number)}@s.whatsapp.net`;

export const extractDataFromMessage = (webMessage: WaBotMessage): ExtractedMessageData => {
  const textMessage = webMessage.message?.conversation;
  const extendedTextMessage = webMessage.message?.extendedTextMessage;
  const extendedTextMessageText = extendedTextMessage?.text;
  const imageTextMessage = webMessage.message?.imageMessage?.caption;
  const videoTextMessage = webMessage.message?.videoMessage?.caption;

  const fullMessage =
    textMessage ||
    extendedTextMessageText ||
    imageTextMessage ||
    videoTextMessage;

  if (!fullMessage) {
    return {
      args: [],
      commandName: null,
      fullArgs: null,
      fullMessage: null,
      isReply: false,
      prefix: null,
      remoteJid: null,
      replyJid: null,
      userJid: null,
    };
  }

  const isReply =
    !!extendedTextMessage && !!extendedTextMessage.contextInfo?.quotedMessage;

  const replyJid =
    !!extendedTextMessage && !!extendedTextMessage.contextInfo?.participant
      ? extendedTextMessage.contextInfo.participant
      : null;

  const userJid = webMessage?.key?.participant
    ? webMessage.key.participant.replace(/:[0-9][0-9]|:[0-9]/g, "")
    : null;

  const [command, ...args] = fullMessage.split(" ");
  const prefix = command.charAt(0);

  const commandWithoutPrefix = command.replace(new RegExp(`^[${PREFIX}]+`), "");

  return {
    args: splitByCharacters(args.join(" "), ["\\", "|", "/"]),
    commandName: formatCommand(commandWithoutPrefix),
    fullArgs: args.join(" "),
    fullMessage,
    isReply,
    prefix,
    remoteJid: webMessage?.key?.remoteJid || null,
    replyJid,
    userJid,
  };
};

export const splitByCharacters = (str: string, characters: string[]): string[] => {
  characters = characters.map((char) => (char === "\\" ? "\\\\" : char));
  const regex = new RegExp(`[${characters.join("")}]`);

  return str
    .split(regex)
    .map((str) => str.trim())
    .filter(Boolean);
};

export const formatCommand = (text: string): string => {
  return onlyLettersAndNumbers(
    removeAccentsAndSpecialCharacters(text.toLocaleLowerCase().trim())
  );
};

export const onlyLettersAndNumbers = (text: string): string => {
  return text.replace(/[^a-zA-Z0-9]/g, "");
};

export const removeAccentsAndSpecialCharacters = (text: string): string => {
  if (!text) return "";

  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export const onlyNumbers = (text: string): string => text.replace(/[^0-9]/g, "");

export const baileysIs = (webMessage: WaBotMessage, context: BaileysContentType): boolean => {
  return !!getContent(webMessage, context);
};

export const getContent = (webMessage: WaBotMessage, context: BaileysContentType): any => {
  return (
    webMessage.message?.[`${context}Message`] ||
    webMessage.message?.extendedTextMessage?.contextInfo?.quotedMessage?.[
      `${context}Message`
    ]
  );
};

export const download = async (
  webMessage: WaBotMessage, 
  fileName: string, 
  context: BaileysContentType, 
  extension: string
): Promise<string | null> => {
  const content = getContent(webMessage, context);

  if (!content) {
    return null;
  }

  const stream = await downloadContentFromMessage(content, context);

  let buffer = Buffer.from([]);

  for await (const chunk of stream) {
    buffer = Buffer.concat([buffer, chunk]);
  }

  const filePath = path.resolve(TEMP_DIR, `${fileName}.${extension}`);

  await writeFile(filePath, buffer);

  return filePath;
};

function readDirectoryRecursive(dir: string): string[] {
  const results: string[] = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of list) {
    const itemPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      results.push(...readDirectoryRecursive(itemPath));
    } else if (
      !item.name.startsWith("_") &&
      (item.name.endsWith(".js") || item.name.endsWith(".ts"))
    ) {
      results.push(itemPath);
    }
  }

  return results;
}

export const findCommandImport = (commandName: string): FindCommandResult => {
  const commands = readCommandImports();

  let typeReturn = "";
  let targetCommandReturn: Command | null = null;

  for (const [type, cmds] of Object.entries(commands)) {
    if (!cmds.length) {
      continue;
    }

    const targetCommand = cmds.find((cmd) =>
      cmd.commands.map((c) => formatCommand(c)).includes(commandName)
    );

    if (targetCommand) {
      typeReturn = type;
      targetCommandReturn = targetCommand;
      break;
    }
  }

  return {
    type: typeReturn,
    command: targetCommandReturn,
  };
};

export const readCommandImports = (): CommandImport => {
  const subdirectories = fs
    .readdirSync(COMMANDS_DIR, { withFileTypes: true })
    .filter((directory) => directory.isDirectory())
    .map((directory) => directory.name);

  const commandImports: CommandImport = {};

  for (const subdir of subdirectories) {
    const subdirectoryPath = path.join(COMMANDS_DIR, subdir);

    const files = readDirectoryRecursive(subdirectoryPath)
      .map((filePath) => {
        try {
          return require(filePath);
        } catch (err) {
          console.error(`Erro ao importar ${filePath}:`, err);
          return null;
        }
      })
      .filter(Boolean);

    commandImports[subdir] = files;
  }

  return commandImports;
};

export const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomName = (extension: string): string => {
  return `${Math.floor(Math.random() * 10000)}${Date.now().toString()}.${extension}`;
};

export const getBuffer = (url: string, options?: AxiosRequestConfig): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url,
      headers: {
        DNT: 1,
        "Upgrade-Insecure-Request": 1,
        range: "bytes=0-",
      },
      ...options,
      responseType: "arraybuffer",
      proxy: options?.proxy || false,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch(reject);
  });
}; 