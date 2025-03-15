import { PREFIX } from "../../config";
import { CommandHandlerParams } from "../../types/commands";

export const name = "ping";
export const description = "Verificar se o bot está online";
export const commands = ["ping"];
export const usage = `${PREFIX}ping`;

export const handle = async ({ sendReply, sendReact }: CommandHandlerParams): Promise<void> => {
  await sendReact("🏓");
  await sendReply(`🏓 Pong!`);
}; 