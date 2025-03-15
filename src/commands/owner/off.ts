import { PREFIX } from "../../config";
import { deactivateGroup } from "../../utils/database";
import { CommandHandlerParams } from "../../types/commands";

export const name = "off";
export const description = "Desativa o bot no grupo";
export const commands = ["off"];
export const usage = `${PREFIX}off`;

export const handle = async ({ 
  sendSuccessReply, 
  remoteJid 
}: CommandHandlerParams): Promise<void> => {
  if (!remoteJid) {
    return;
  }
  
  deactivateGroup(remoteJid);
  await sendSuccessReply("Bot desativado no grupo!");
}; 