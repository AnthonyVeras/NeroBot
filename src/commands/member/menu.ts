import { PREFIX, ASSETS_DIR } from "../../config";
import { menuMessage } from "../../utils/messages";
import path from "path";
import { CommandHandlerParams } from "../../types/commands";

export const name = "menu";
export const description = "Menu de comandos";
export const commands = ["menu", "help"];
export const usage = `${PREFIX}menu`;

export const handle = async ({ sendImageFromFile, sendReact }: CommandHandlerParams): Promise<void> => {
  // Enviar uma reação de menu
  await sendReact("📋");
  
  // Nota: Substituímos "takeshi-bot.png" por "nero-bot.png" conforme regras de identidade visual
  await sendImageFromFile(
    path.join(ASSETS_DIR, "images", "nero-bot.png"),
    `\n\n${menuMessage()}`
  );
}; 