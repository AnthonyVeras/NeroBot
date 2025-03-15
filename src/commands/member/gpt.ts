import { PREFIX } from "../../config";
import { InvalidParameterError } from "../../errors/InvalidParameterError";
import { generateText } from "../../services/ai-service";
import { CommandHandlerParams } from "../../types/commands";

export const name = "gpt";
export const description = "Inteligência artificial para responder suas perguntas!";
export const commands = ["gpt", "ia", "nero"];
export const usage = `${PREFIX}gpt com quantos paus se faz uma canoa?`;

export const handle = async ({ 
  sendSuccessReply, 
  sendWaitReply, 
  fullArgs,
  sendErrorReply,
}: CommandHandlerParams): Promise<void> => {
  if (!fullArgs) {
    throw new InvalidParameterError(
      "Você precisa me dizer o que eu devo responder!"
    );
  }

  await sendWaitReply("Pensando na resposta. Isso pode levar alguns segundos...");

  try {
    const responseText = await generateText(fullArgs);

    if (!responseText) {
      await sendErrorReply("Não foi possível gerar uma resposta. Tente novamente.");
      return;
    }

    await sendSuccessReply(responseText);
  } catch (error: any) {
    console.error("Erro ao gerar resposta da IA:", error);
    await sendErrorReply("Ocorreu um erro ao processar sua pergunta: " + error.message);
  }
}; 