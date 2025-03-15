import path from "path";

// Prefixo dos comandos.
export const PREFIX = "/";

// Emoji do bot (mude se preferir).
export const BOT_EMOJI = "🤖";

// Nome do bot (mude se preferir).
export const BOT_NAME = "Nero Bot";

// Número do bot. Coloque o número do bot
// (apenas números, exatamente como está no WhatsApp).
export const BOT_NUMBER = "559999999999";

// Número do dono do bot. Coloque o número do dono do bot
// (apenas números, exatamente como está no WhatsApp).
export const OWNER_NUMBER = "559999999999";

// Diretório dos comandos
export const COMMANDS_DIR = path.join(__dirname, "commands");

// Diretório de arquivos de mídia.
export const ASSETS_DIR = path.resolve(__dirname, "..", "assets");

// Diretório de arquivos temporários.
export const TEMP_DIR = path.resolve(__dirname, "..", "assets", "temp");

// Timeout em milissegundos por evento (evita banimento).
export const TIMEOUT_IN_MILLISECONDS_BY_EVENT = 700;

// Caso queira responder apenas um grupo específico, coloque o ID dele aqui (ex: 120363023799506419@g.us). Apenas para testes internos!
export const ONLY_GROUP_ID = "";

// Diretório base do projeto.
export const BASE_DIR = path.resolve(__dirname); 