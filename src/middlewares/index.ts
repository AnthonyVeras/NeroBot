/**
 * Middlewares do bot
 * @author Anthony
 */
import { PREFIX, OWNER_NUMBER } from "../config";
import { WaBotClient } from "../types/baileys";

export const verifyPrefix = (prefix: string): boolean => PREFIX === prefix;

export const hasTypeOrCommand = ({ type, command }: { type?: string; command?: any }): boolean => 
  !!type && !!command;

export const isLink = (text: string): boolean => {
  const regex = /(https?:\/\/(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/\S*)?)/g;
  return regex.test(text);
};

interface IsAdminParams {
  remoteJid: string;
  userJid: string;
  socket: WaBotClient;
}

export const toUserJid = (phoneNumber: string): string => 
  `${phoneNumber}@s.whatsapp.net`;

export const isAdmin = async ({ remoteJid, userJid, socket }: IsAdminParams): Promise<boolean> => {
  try {
    const { participants, owner } = await socket.groupMetadata(remoteJid);

    const participant = participants.find(
      (participant) => participant.id === userJid
    );

    if (!participant) {
      return false;
    }

    const isOwner =
      participant.id === owner ||
      participant.admin === "superadmin" ||
      participant.id === toUserJid(OWNER_NUMBER);

    const isAdmin = participant.admin === "admin";

    return isOwner || isAdmin;
  } catch (error) {
    return false;
  }
}; 