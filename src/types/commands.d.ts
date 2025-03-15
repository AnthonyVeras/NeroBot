/**
 * Definições de tipos para os comandos do bot
 * 
 * @author Anthony
 */
import { WaBotClient, WaBotMessage } from './baileys';
import { proto } from 'baileys';

export interface CommandArgs {
  client: WaBotClient;
  message: WaBotMessage;
  args: string[];
  prefix: string;
  command: string;
}

export interface CommandConfig {
  name: string;
  description: string;
  aliases?: string[];
  usage?: string;
  category?: string;
  cooldown?: number;
  isOwnerOnly?: boolean;
  isGroupOnly?: boolean;
  isPrivateOnly?: boolean;
  minArgs?: number;
  maxArgs?: number;
}

export interface Command extends CommandConfig {
  execute: (args: CommandArgs) => Promise<any>;
}

export interface CommandCategory {
  name: string;
  emoji: string;
  description: string;
}

export interface CommandManager {
  register: (command: Command) => void;
  get: (name: string) => Command | undefined;
  getAll: () => Map<string, Command>;
  getByCategory: (category: string) => Command[];
  getAllCategories: () => CommandCategory[];
  loadCommands: (directory: string) => Promise<void>;
}

export interface CommonFunctions {
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
  type?: string;
}

// Alias para manter compatibilidade com código existente
export type CommandHandlerParams = CommonFunctions;

export interface Command {
  name: string;
  commands: string[];
  description?: string;
  category?: string;
  handle: (params: CommonFunctions) => Promise<void>;
}

export interface CommandImport {
  [type: string]: Command[];
} 