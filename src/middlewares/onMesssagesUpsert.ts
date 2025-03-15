/**
 * Evento chamado quando uma mensagem
 * é enviada para o grupo do WhatsApp
 *
 * @author Anthony
 */
import { dynamicCommand } from "../utils/dynamicCommand";
import { loadCommonFunctions } from "../utils/loadCommonFunctions";
import { WaBotClient, WaBotMessage } from "../types/baileys";

interface MessagesUpsertParams {
  socket: WaBotClient;
  messages: WaBotMessage[];
}

export const onMessagesUpsert = async ({ socket, messages }: MessagesUpsertParams): Promise<void> => {
  if (!messages.length) {
    return;
  }

  for (const webMessage of messages) {
    const commonFunctions = loadCommonFunctions({ socket, webMessage });

    if (!commonFunctions) {
      continue;
    }

    await dynamicCommand(commonFunctions);
  }
}; 