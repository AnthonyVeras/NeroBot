import { PREFIX } from "../../config";
import { searchMusic } from "../../services/music-api";
import { InvalidParameterError } from "../../errors/InvalidParameterError";
import { CommandHandlerParams } from "../../types/commands";

export const name = "play-audio";
export const description = "Faço o download de músicas";
export const commands = ["play-audio", "play", "pa"];
export const usage = `${PREFIX}play-audio MC Hariel`;

export const handle = async ({
  sendAudioFromURL,
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
    const musicData = await searchMusic(searchTerm);

    if (!musicData) {
      await sendErrorReply("Nenhum resultado encontrado!");
      return;
    }

    await sendSuccessReact();
    
    // Enviando informações sobre a música que está sendo enviada
    await sendAudioFromURL(musicData.url);
  } catch (error: any) {
    console.log(error);
    await sendErrorReply(error.message);
  }
} 