import { PREFIX } from "../../config";
import { CommandHandlerParams } from "../../types/commands";

export const name = "hide-tag";
export const description = "Este comando marcará todos do grupo";
export const commands = ["hide-tag", "hidetag"];
export const usage = `${PREFIX}hidetag motivo`;

export const handle = async ({ 
  fullArgs, 
  sendText, 
  socket, 
  remoteJid, 
  sendReact,
  sendErrorReply,
}: CommandHandlerParams): Promise<void> => {
  if (!remoteJid) {
    await sendErrorReply("Este comando só pode ser executado em grupos!");
    return;
  }

  try {
    const { participants } = await socket.groupMetadata(remoteJid);

    if (!participants || !Array.isArray(participants)) {
      await sendErrorReply("Não foi possível obter a lista de participantes do grupo!");
      return;
    }

    const mentions = participants.map(({ id }) => id);

    await sendReact("📢");
    
    const message = fullArgs 
      ? `📢 Marcando todos!\n\n${fullArgs}` 
      : "📢 Marcando todos!";

    await sendText(message, mentions);
  } catch (error: any) {
    console.error("Erro ao obter dados do grupo:", error);
    await sendErrorReply(`Ocorreu um erro: ${error.message}`);
  }
}; 