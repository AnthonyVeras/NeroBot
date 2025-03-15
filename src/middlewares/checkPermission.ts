/**
 * Verificador de permissões
 * 
 * @author Anthony
 */
import { OWNER_NUMBER } from "../config";
import { WaBotClient } from "../types/baileys";

interface CheckPermissionParams {
  type: string;
  socket: WaBotClient;
  userJid: string;
  remoteJid: string;
}

interface GroupParticipant {
  id: string;
  admin?: 'admin' | 'superadmin' | null;
}

interface GroupMetadata {
  id: string;
  subject: string;
  owner?: string;
  desc?: string;
  participants: GroupParticipant[];
}

export const checkPermission = async ({ 
  type, 
  socket, 
  userJid, 
  remoteJid 
}: CheckPermissionParams): Promise<boolean> => {
  if (type === "member") {
    return true;
  }

  try {
    const { participants, owner } = await socket.groupMetadata(remoteJid) as GroupMetadata;

    const participant = participants.find(
      (participant) => participant.id === userJid
    );

    if (!participant) {
      return false;
    }

    const isOwner =
      participant.id === owner || participant.admin === "superadmin";

    const isAdmin = participant.admin === "admin";

    const isBotOwner = userJid === `${OWNER_NUMBER}@s.whatsapp.net`;

    if (type === "admin") {
      return isOwner || isAdmin || isBotOwner;
    }

    if (type === "owner") {
      return isOwner || isBotOwner;
    }

    return false;
  } catch (error) {
    return false;
  }
}; 