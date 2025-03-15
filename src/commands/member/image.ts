import { PREFIX } from "../../config";
import { WarningError } from "../../errors/WarningError";
import { generateImage } from "../../services/ai-service";
import { CommandHandlerParams } from "../../types/commands";

export const name = "image";
export const description = "Gera uma imagem a partir da descrição fornecida";
export const commands = ["image", "img", "imagem"];
export const usage = `${PREFIX}imagem <descrição>`;

export const handle = async ({
  fullArgs,
  sendWaitReply,
  sendSuccessReact,
  sendImageFromURL,
  sendErrorReply,
}: CommandHandlerParams): Promise<void> => {
  if (!fullArgs) {
    throw new WarningError(
      "Por favor, forneça uma descrição para gerar a imagem."
    );
  }

  await sendWaitReply("Gerando imagem. Isso pode levar alguns segundos...");

  try {
    const imageData = await generateImage(fullArgs);

    if (!imageData) {
      await sendErrorReply("Não foi possível gerar a imagem. Tente novamente com outra descrição.");
      return;
    }

    await sendSuccessReact();
    await sendImageFromURL(imageData.url);
  } catch (error: any) {
    console.error("Erro ao gerar imagem:", error);
    await sendErrorReply("Ocorreu um erro ao gerar a imagem: " + error.message);
  }
}; 