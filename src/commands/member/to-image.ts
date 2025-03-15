import { PREFIX, TEMP_DIR } from "../../config";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { InvalidParameterError } from "../../errors/InvalidParameterError";
import { getRandomNumber } from "../../utils";
import { CommandHandlerParams } from "../../types/commands";

export const name = "toimage";
export const description = "Transformo figurinhas estáticas em imagem";
export const commands = ["toimage", "toimg"];
export const usage = `${PREFIX}toimage (marque a figurinha) ou ${PREFIX}toimage (responda a figurinha)`;

export const handle = async ({
  isSticker,
  downloadSticker,
  webMessage,
  sendWaitReact,
  sendSuccessReact,
  sendImageFromFile,
  sendErrorReply,
}: CommandHandlerParams): Promise<void> => {
  if (!isSticker) {
    throw new InvalidParameterError("Você precisa enviar uma figurinha!");
  }

  await sendWaitReact();

  const inputPath = await downloadSticker(webMessage, "input");
  
  if (!inputPath) {
    await sendErrorReply("Não foi possível baixar a figurinha.");
    return;
  }
  
  const outputPath = path.resolve(
    TEMP_DIR,
    `${getRandomNumber(10_000, 99_999)}.png`
  );

  exec(`ffmpeg -i ${inputPath} ${outputPath}`, async (error) => {
    if (error) {
      console.log(error);
      fs.unlinkSync(inputPath);
      throw new Error(error.message);
    }

    await sendSuccessReact();
    await sendImageFromFile(outputPath);
    
    // Limpando os arquivos temporários após o uso
    setTimeout(() => {
      try {
        if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
        if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
      } catch (err) {
        console.error("Erro ao limpar arquivos temporários:", err);
      }
    }, 10000); // Limpa após 10 segundos
  });
}; 