import { PREFIX, BOT_NUMBER } from "../../config";
import { DangerError } from "../../errors/DangerError";
import { InvalidParameterError } from "../../errors/InvalidParameterError";
import { toUserJid, onlyNumbers } from "../../utils";
import { CommandHandlerParams } from "../../types/commands";

export const name = "banir";
export const description = "Removo um membro do grupo";
export const commands = ["ban", "kick"];
export const usage = `${PREFIX}ban @marcar_membro 
  
ou 

${PREFIX}ban (mencionando uma mensagem)`;

export const handle = async ({
  args,
  isReply,
  socket,
  remoteJid,
  replyJid,
  sendReply,
  userJid,
  sendSuccessReact,
  sendErrorReply,
}: CommandHandlerParams): Promise<void> => {
  if (!args.length && !isReply) {
    throw new InvalidParameterError(
      "Você precisa mencionar ou marcar um membro!"
    );
  }

  if (!remoteJid) {
    throw new InvalidParameterError("Este comando só pode ser usado em grupos!");
  }

  const memberToRemoveJid = isReply && replyJid ? replyJid : args[0] ? toUserJid(args[0]) : null;
  
  if (!memberToRemoveJid) {
    throw new InvalidParameterError("Não foi possível identificar o membro a ser removido!");
  }
  
  const memberToRemoveNumber = onlyNumbers(memberToRemoveJid);

  if (memberToRemoveNumber.length < 7 || memberToRemoveNumber.length > 15) {
    throw new InvalidParameterError("Número inválido!");
  }

  if (memberToRemoveJid === userJid) {
    throw new DangerError("Você não pode remover você mesmo!");
  }

  const botJid = toUserJid(BOT_NUMBER);

  if (memberToRemoveJid === botJid) {
    throw new DangerError("Você não pode me remover!");
  }

  try {
    await socket.groupParticipantsUpdate(
      remoteJid,
      [memberToRemoveJid],
      "remove"
    );

    await sendSuccessReact();
    await sendReply("Membro removido com sucesso!");
  } catch (error: any) {
    console.error("Erro ao remover membro:", error);
    await sendErrorReply(`Não foi possível remover o membro: ${error.message}`);
  }
}; 