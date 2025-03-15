/**
 * Loader de comandos
 * 
 * Carrega os comandos do bot
 * 
 * @author Anthony
 */
import { TIMEOUT_IN_MILLISECONDS_BY_EVENT } from "./config";
// @ts-ignore
import { onMessagesUpsert } from "./middlewares/onMesssagesUpsert";
// @ts-ignore
import { onGroupParticipantsUpdate } from "./middlewares/onGroupParticipantsUpdate";
import path from "path";
import { WaBotClient } from "./types/baileys";

export const load = (socket: WaBotClient): void => {
  (global as any).BASE_DIR = path.resolve(__dirname);

  socket.ev.on("messages.upsert", async ({ messages }) => {
    setTimeout(() => {
      onMessagesUpsert({ socket, messages });
    }, TIMEOUT_IN_MILLISECONDS_BY_EVENT);
  });

  socket.ev.on("group-participants.update", async (data) => {
    setTimeout(() => {
      try {
        onGroupParticipantsUpdate({ socket, groupParticipantsUpdate: data });
      } catch (error) {
        console.error(error);
      }
    }, TIMEOUT_IN_MILLISECONDS_BY_EVENT);
  });
}; 