import { PREFIX } from "../../config";
import { InvalidParameterError } from "../../errors/InvalidParameterError";
import {
  activateAutoResponderGroup,
  deactivateAutoResponderGroup,
} from "../../utils/database";
import { CommandHandlerParams } from "../../types/commands";

export const name = "auto-responder";
export const description = "Ativo/desativo o recurso de auto-responder no grupo.";
export const commands = ["auto-responder"];
export const usage = `${PREFIX}auto-responder (1/0)`;

export const handle = async ({ 
  args, 
  sendReply, 
  sendSuccessReact, 
  remoteJid 
}: CommandHandlerParams): Promise<void> => {
  if (!args.length) {
    throw new InvalidParameterError(
      "Você precisa digitar 1 ou 0 (ligar ou desligar)!"
    );
  }

  if (!remoteJid) {
    throw new InvalidParameterError(
      "Este comando só pode ser executado em grupos!"
    );
  }

  const autoResponder = args[0] === "1";
  const notAutoResponder = args[0] === "0";

  if (!autoResponder && !notAutoResponder) {
    throw new InvalidParameterError(
      "Você precisa digitar 1 ou 0 (ligar ou desligar)!"
    );
  }

  if (autoResponder) {
    activateAutoResponderGroup(remoteJid);
  } else {
    deactivateAutoResponderGroup(remoteJid);
  }

  await sendSuccessReact();

  const context = autoResponder ? "ativado" : "desativado";

  await sendReply(`Recurso de auto-responder ${context} com sucesso!`);
}; 