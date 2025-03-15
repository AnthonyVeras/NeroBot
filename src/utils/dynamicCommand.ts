/**
 * Gerencia a execução dinâmica de comandos do bot, verificando permissões
 * e condições necessárias para cada comando.
 * 
 * @author Anthony
 */
import { DangerError } from "../errors/DangerError";
import { InvalidParameterError } from "../errors/InvalidParameterError";
import { WarningError } from "../errors/WarningError";
import { isAdmin, isLink } from "../middlewares";
import { checkPermission } from "../middlewares/checkPermission";
import { isActiveGroup } from "../utils/database";
import { baileysIs, findCommandImport } from "../utils";
import { WaBotClient, WaBotMessage } from "../types/baileys";
import { CommonFunctions, Command } from "../types/commands";

/**
 * Executa um comando dinamicamente, verificando se o grupo está ativo
 * e se o usuário tem as permissões necessárias
 * 
 * @param params Objeto com funções e dados comuns a todos os comandos
 * @returns Promise<void>
 */
export const dynamicCommand = async (
  params: CommonFunctions
): Promise<void> => {
  const {
    socket,
    webMessage,
    commandName,
    remoteJid,
    userJid,
    fullMessage,
    sendText
  } = params;

  try {
    if (!remoteJid) {
      return;
    }

    const isGroup = remoteJid.endsWith("@g.us");

    // Verificação anti-link (bloqueia links em grupos)
    if (
      isGroup &&
      fullMessage &&
      isLink(fullMessage) &&
      userJid &&
      !isAdmin({ socket, remoteJid, userJid })
    ) {
      await sendText("🚫 Links não são permitidos neste grupo!");
      await socket.groupParticipantsUpdate(remoteJid, [userJid], "remove");
      return;
    }

    // Verificação de comando
    if (!commandName) {
      return;
    }

    // Busca o comando
    const { command, type } = findCommandImport(commandName);

    // Se não encontrou o comando, não faz nada
    if (!command) {
      return;
    }

    // Se for um grupo, verifica se está ativo para comandos
    if (isGroup && !isActiveGroup(remoteJid) && type !== "owner") {
      await sendText("❌ Os comandos estão desativados neste grupo!");
      return;
    }

    // Verificação de permissão baseada no tipo do comando
    const hasPermission = await checkPermission({
      socket,
      userJid: userJid || "",
      remoteJid,
      type
    });

    if (!hasPermission) {
      await sendText(
        "❌ Você não tem permissão para executar este comando!"
      );
      return;
    }

    // Verificação de condições especiais (se é imagem, vídeo, etc)
    if (params.isImage && !baileysIs(webMessage as WaBotMessage, "image")) {
      await sendText("❌ Este comando requer uma imagem!");
      return;
    }

    if (params.isVideo && !baileysIs(webMessage as WaBotMessage, "video")) {
      await sendText("❌ Este comando requer um vídeo!");
      return;
    }

    if (params.isSticker && !baileysIs(webMessage as WaBotMessage, "sticker")) {
      await sendText("❌ Este comando requer um sticker!");
      return;
    }

    // Executa o comando
    await command.handle(params);
  } catch (error) {
    console.error(`[dynamicCommand] Erro ao executar comando:`, error);

    if (error instanceof InvalidParameterError) {
      await sendText(`❌ ${error.message}`);
      return;
    }

    if (error instanceof WarningError) {
      await sendText(`⚠️ ${error.message}`);
      return;
    }

    if (error instanceof DangerError) {
      await sendText(`⛔ ${error.message}`);
      return;
    }

    await sendText("❌ Ocorreu um erro ao executar o comando.");
  }
}; 