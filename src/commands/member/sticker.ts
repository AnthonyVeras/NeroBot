import { PREFIX, TEMP_DIR } from "../../config";
import { InvalidParameterError } from "../../errors/InvalidParameterError";
import path from "path";
import fs from "fs";
import { exec } from "child_process";
import { getRandomNumber } from "../../utils";
import { CommandHandlerParams } from "../../types/commands";
import { WaBotMessage } from "../../types/baileys";

export const name = "sticker";
export const description = "Faço figurinhas de imagem/gif/vídeo";
export const commands = ["s", "sticker", "fig", "f"];
export const usage = `${PREFIX}sticker (marque a imagem/gif/vídeo) ou ${PREFIX}sticker (responda a imagem/gif/vídeo)`;

export const handle = async ({
  isImage,
  isVideo,
  downloadImage,
  downloadVideo,
  webMessage,
  sendErrorReply,
  sendSuccessReact,
  sendWaitReact,
  sendStickerFromFile,
}: CommandHandlerParams): Promise<void> => {
  if (!isImage && !isVideo) {
    throw new InvalidParameterError(
      "Você precisa marcar uma imagem/gif/vídeo ou responder a uma imagem/gif/vídeo"
    );
  }

  await sendWaitReact();

  const outputPath = path.resolve(
    TEMP_DIR,
    `${getRandomNumber(10_000, 99_999)}.webp`
  );

  if (isImage) {
    const inputPath = await downloadImage(webMessage, "input");

    if (!inputPath) {
      await sendErrorReply("Não foi possível baixar a imagem.");
      return;
    }

    exec(
      `ffmpeg -i ${inputPath} -vf scale=512:512 ${outputPath}`,
      async (error) => {
        if (error) {
          console.log(error);
          fs.unlinkSync(inputPath);
          throw new Error(error.message);
        }

        await sendSuccessReact();
        await sendStickerFromFile(outputPath);
      }
    );
  } else {
    const inputPath = await downloadVideo(webMessage, "input");

    if (!inputPath) {
      await sendErrorReply("Não foi possível baixar o vídeo.");
      return;
    }

    const sizeInSeconds = 10;

    // Acessando as propriedades opcionais de forma segura com TypeScript
    const videoMessage = webMessage.message?.videoMessage;
    const quotedVideoMessage = webMessage.message?.extendedTextMessage?.contextInfo?.quotedMessage?.videoMessage;
    
    const seconds = videoMessage?.seconds || quotedVideoMessage?.seconds;

    if (!seconds || seconds > sizeInSeconds) {
      fs.unlinkSync(inputPath);

      await sendErrorReply(`O vídeo que você enviou tem mais de ${sizeInSeconds} segundos!

Envie um vídeo menor!`);

      return;
    }

    exec(
      `ffmpeg -i ${inputPath} -y -vcodec libwebp -fs 0.99M -filter_complex "[0:v] scale=512:512,fps=12,pad=512:512:-1:-1:color=white@0.0,split[a][b];[a]palettegen=reserve_transparent=on:transparency_color=ffffff[p];[b][p]paletteuse" -f webp ${outputPath}`,
      async (error) => {
        if (error) {
          console.log(error);
          fs.unlinkSync(inputPath);

          throw new Error(error.message);
        }

        await sendSuccessReact();
        await sendStickerFromFile(outputPath);
      }
    );
  }
}; 