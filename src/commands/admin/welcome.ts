import { PREFIX } from "../../config";
import { InvalidParameterError } from "../../errors/InvalidParameterError";
import {
  activateWelcomeGroup,
  deactivateWelcomeGroup,
} from "../../utils/database";
import { CommandHandlerParams } from "../../types/commands";

export const name = "welcome";
export const description = "Ativo/desativo o recurso de boas-vindas no grupo.";
export const commands = [
  "welcome",
  "bemvindo",
  "boasvinda",
  "boasvindas",
  "boavinda",
  "boavindas",
  "welkom",
  "welkon",
];
export const usage = `${PREFIX}welcome (1/0)`;

export const handle = async ({ 
  args, 
  sendReply, 
  sendSuccessReact, 
  remoteJid,
  sendErrorReply,
}: CommandHandlerParams): Promise<void> => {
  if (!args.length) {
    throw new InvalidParameterError(
      "Você precisa digitar 1 ou 0 (ligar ou desligar)!"
    );
  }

  if (!remoteJid) {
    await sendErrorReply("Este comando só pode ser executado em grupos!");
    return;
  }

  const welcome = args[0] === "1";
  const notWelcome = args[0] === "0";

  if (!welcome && !notWelcome) {
    throw new InvalidParameterError(
      "Você precisa digitar 1 ou 0 (ligar ou desligar)!"
    );
  }

  try {
    if (welcome) {
      activateWelcomeGroup(remoteJid);
    } else {
      deactivateWelcomeGroup(remoteJid);
    }

    await sendSuccessReact();

    const context = welcome ? "ativado" : "desativado";

    await sendReply(`Recurso de boas-vindas ${context} com sucesso!`);
  } catch (error: any) {
    console.error("Erro ao configurar mensagem de boas-vindas:", error);
    await sendErrorReply(`Ocorreu um erro: ${error.message}`);
  }
}; 