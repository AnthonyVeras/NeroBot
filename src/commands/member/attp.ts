import { PREFIX } from "../../config";
import { InvalidParameterError } from "../../errors/InvalidParameterError";
import { generateAtttSticker } from "../../services/stickers-service";
import { CommandHandlerParams } from "../../types/commands";

export const name = "attp";
export const description = "Faz figurinhas animadas de texto.";
export const commands = ["attp"];
export const usage = `${PREFIX}attp teste`;

export const handle = async ({
  sendWaitReact,
  args,
  sendStickerFromURL,
  sendSuccessReact,
  sendErrorReply,
}: CommandHandlerParams): Promise<void> => {
  if (!args.length) {
    throw new InvalidParameterError(
      "Você precisa informar o texto que deseja transformar em figurinha."
    );
  }

  // Juntamos todos os argumentos para permitir textos com espaços
  const text = args.join(" ").trim();
  
  if (!text) {
    throw new InvalidParameterError("O texto não pode estar vazio.");
  }

  await sendWaitReact();

  try {
    const url = await generateAtttSticker(text);
    
    await sendSuccessReact();
    await sendStickerFromURL(url);
  } catch (error: any) {
    console.error("Erro ao gerar sticker ATTP:", error);
    await sendErrorReply("Ocorreu um erro ao gerar a figurinha: " + error.message);
  }
}; 