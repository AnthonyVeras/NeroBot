import { PREFIX } from "../../config";
import { searchVideo } from "../../services/music-api";
import { InvalidParameterError } from "../../errors/InvalidParameterError";
import { CommandHandlerParams } from "../../types/commands";

export const name = "play-video";
export const description = "Faço o download de vídeos";
export const commands = ["play-video", "pv"];
export const usage = `${PREFIX}play-video MC Hariel`;

export const handle = async ({
  sendVideoFromURL,
  args,
  sendWaitReply,
  sendSuccessReact,
  sendErrorReply,
}: CommandHandlerParams): Promise<void> => {
  if (!args.length) {
    throw new InvalidParameterError(
      "Você precisa me dizer o que deseja buscar!"
    );
  }

  const searchTerm = args.join(" ");
  
  await sendWaitReply(`Buscando "${searchTerm}"...`);

  try {
    const videoData = await searchVideo(searchTerm);

    if (!videoData) {
      await sendErrorReply("Nenhum resultado encontrado!");
      return;
    }

    await sendSuccessReact();
    
    // Enviando o vídeo para o usuário
    await sendVideoFromURL(videoData.url);
  } catch (error: any) {
    console.log(error);
    await sendErrorReply(error.message);
  }
}; 