import { proto, WASocket } from 'baileys';

// Definindo o tipo para ações de participantes de grupo
export type ParticipantAction = "add" | "remove" | "promote" | "demote" | "modify";

// Interface para atualização de participantes de grupo
export interface GroupParticipantsUpdate {
  id: string;
  participants: string[];
  action: ParticipantAction;
}

// Atualizando a interface para ser compatível com o IWebMessageInfo
export interface WaBotMessage extends proto.IWebMessageInfo {
  body?: string;
  from?: string;
}

export interface WaBotClient extends WASocket {
  // Extensões personalizadas do cliente
  sendText: (jid: string, text: string, quoted?: WaBotMessage) => Promise<proto.WebMessageInfo>;
  reply: (jid: string, text: string, quoted: WaBotMessage) => Promise<proto.WebMessageInfo>;
  sendImage: (jid: string, url: string, caption?: string, quoted?: WaBotMessage) => Promise<proto.WebMessageInfo>;
  sendAudio: (jid: string, url: string, quoted?: WaBotMessage) => Promise<proto.WebMessageInfo>;
  sendVideo: (jid: string, url: string, caption?: string, quoted?: WaBotMessage) => Promise<proto.WebMessageInfo>;
  sendSticker: (jid: string, url: string, quoted?: WaBotMessage) => Promise<proto.WebMessageInfo>;
}

export interface BaileysEventHandlers {
  onMessage: (message: WaBotMessage, client: WaBotClient) => Promise<void>;
  onConnect: (client: WaBotClient) => Promise<void>;
  onDisconnect: (reason: string) => Promise<void>;
} 