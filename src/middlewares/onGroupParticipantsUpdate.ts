/**
 * Evento chamado quando um usuário
 * entra ou sai de um grupo de WhatsApp.
 *
 * @author Anthony
 */
import { getProfileImageData } from "../services/baileys";
import fs from "fs";
import { onlyNumbers } from "../utils";
import { isActiveWelcomeGroup } from "../utils/database";
import { warningLog } from "../utils/logger";
import { WaBotClient, GroupParticipantsUpdate } from "../types/baileys";

interface GroupParticipantsUpdateParams {
  groupParticipantsUpdate: GroupParticipantsUpdate;
  socket: WaBotClient;
}

export const onGroupParticipantsUpdate = async ({
  groupParticipantsUpdate,
  socket,
}: GroupParticipantsUpdateParams): Promise<void> => {
  const remoteJid = groupParticipantsUpdate.id;
  const userJid = groupParticipantsUpdate.participants[0];

  if (!isActiveWelcomeGroup(remoteJid)) {
    return;
  }

  if (groupParticipantsUpdate.action === "add") {
    try {
      const { buffer, profileImage } = await getProfileImageData(
        socket,
        userJid
      );

      await socket.sendMessage(remoteJid, {
        image: buffer,
        caption: `Seja bem vindo ao nosso grupo, @${onlyNumbers(userJid)}!`,
        mentions: [userJid],
      });

      if (!profileImage.includes("default-user")) {
        fs.unlinkSync(profileImage);
      }
    } catch (error) {
      warningLog(
        "Alguém entrou no grupo e eu não consegui enviar a mensagem de boas-vindas!"
      );
    }
  }
}; 