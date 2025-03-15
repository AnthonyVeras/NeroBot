/**
 * Serviço de IA para o bot
 * 
 * @author Anthony
 */
import { Hercai } from "hercai";
import { errorLog } from "../utils/logger";

interface ImageResponse {
  url: string;
  model?: string;
}

/**
 * Gera uma imagem baseada em uma descrição de texto
 * 
 * @param prompt Descrição da imagem a ser gerada
 * @returns Objeto contendo a URL da imagem gerada
 */
export const generateImage = async (prompt: string): Promise<ImageResponse | null> => {
  if (!prompt) {
    throw new Error("É necessário fornecer uma descrição para gerar a imagem");
  }

  try {
    const herc = new Hercai();
    
    // Formatamos o prompt para obter melhores resultados
    const formattedPrompt = `Generate a realistic image, 
without deviating from the proposed theme below (attention, it may come in Portuguese, 
translate it into English first):
      
${prompt}`;

    const response = await herc.drawImage({
      model: "simurg",
      prompt: formattedPrompt,
      negative_prompt: "nude, explicit, adult, nsfw",
    });

    if (response && response.url) {
      return {
        url: response.url,
        model: "simurg"
      };
    }
    
    return null;
  } catch (error) {
    errorLog(`Erro ao gerar imagem: ${error}`);
    return null;
  }
};

/**
 * Gera uma resposta de texto baseada em um prompt
 * 
 * @param prompt Texto com a pergunta ou instrução
 * @returns Resposta gerada pela IA
 */
export const generateText = async (prompt: string): Promise<string | null> => {
  if (!prompt) {
    throw new Error("É necessário fornecer um texto para a IA responder");
  }

  try {
    const herc = new Hercai();
    
    const response = await herc.question({
      model: "v3",
      content: prompt
    });

    if (response && response.reply) {
      return response.reply;
    }
    
    return null;
  } catch (error) {
    errorLog(`Erro ao gerar texto: ${error}`);
    return null;
  }
}; 