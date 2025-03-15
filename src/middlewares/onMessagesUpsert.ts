/**
 * Evento chamado quando uma mensagem
 * é enviada para o grupo do WhatsApp
 *
 * @author Anthony
 */
import { dynamicCommand } from "../utils/dynamicCommand";
import { loadCommonFunctions } from "../utils/loadCommonFunctions";
import { WaBotClient, WaBotMessage } from "../types/baileys";
import { proto } from "baileys";

interface OnMessagesUpsertParams {
  socket: WaBotClient;
  messages: proto.IWebMessageInfo[];
}

export const onMessagesUpsert = async ({ socket, messages }: OnMessagesUpsertParams): Promise<void> => {
  if (!messages.length) {
    return;
  }

  for (const webMessage of messages) {
    // Adaptando para o tipo WaBotMessage se necessário
    const botMessage = webMessage as unknown as WaBotMessage;
    const commonFunctions = loadCommonFunctions({ socket, webMessage: botMessage });

    if (!commonFunctions) {
      continue;
    }

    await dynamicCommand(commonFunctions);
  }
}; 