import { PREFIX } from "../../config";
import { generateAiSticker } from "../../services/stickers-service";
import { CommandHandlerParams } from "../../types/commands";

export const name = "ia-sticker";
export const description = "Cria uma figurinha com base em uma descrição";
export const commands = ["ia-sticker", "ia-fig"];
export const usage = `${PREFIX}ia-sticker um gato astronauta`;

export const handle = async ({
  args,
  fullArgs,
  sendWaitReply,
  sendWarningReply,
  sendStickerFromURL,
  sendSuccessReact,
}: CommandHandlerParams): Promise<void> => {
  if (!args.length || !fullArgs) {
    await sendWarningReply(
      "Você precisa fornecer uma descrição para a imagem."
    );
    return;
  }

  await sendWaitReply("Gerando figurinha com IA. Isso pode levar até 30 segundos...");

  try {
    const result = await generateAiSticker(fullArgs);

    if (result.success && result.url) {
      await sendStickerFromURL(result.url);
      await sendSuccessReact();
    } else {
      await sendWarningReply(
        "Não foi possível gerar a figurinha. Tente novamente com outra descrição."
      );
    }
  } catch (error: any) {
    console.error("Erro ao gerar sticker com IA:", error);
    await sendWarningReply(
      `Erro ao gerar figurinha: ${error.message}`
    );
  }
}; 