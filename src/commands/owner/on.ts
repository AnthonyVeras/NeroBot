import { PREFIX } from "../../config";
import { activateGroup } from "../../utils/database";
import { CommandHandlerParams } from "../../types/commands";

export const name = "on";
export const description = "Ativa o bot no grupo";
export const commands = ["on"];
export const usage = `${PREFIX}on`;

export const handle = async ({ 
  sendSuccessReply, 
  remoteJid 
}: CommandHandlerParams): Promise<void> => {
  if (!remoteJid) {
    return;
  }
  
  activateGroup(remoteJid);
  await sendSuccessReply("Bot ativado no grupo!");
}; 