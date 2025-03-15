/**
 * Serviço de criação e manipulação de stickers
 * 
 * @author Anthony
 */
import { generateImage } from './ai-service';
import { errorLog } from '../utils/logger';

interface AiStickerResponse {
  url: string;
  success: boolean;
}

/**
 * Gera uma URL para sticker animado com texto (ATTP)
 * 
 * @param text Texto a ser convertido em sticker animado
 * @returns URL do sticker
 */
export const generateAtttSticker = async (text: string): Promise<string> => {
  if (!text) {
    throw new Error("Texto para sticker não pode estar vazio");
  }
  
  // Usamos um serviço público gratuito para gerar stickers ATTP
  return `https://api.xteam.xyz/attp?file&text=${encodeURIComponent(text)}`;
};

/**
 * Gera um sticker usando IA para criar uma imagem a partir da descrição
 * 
 * @param description Descrição da imagem/figurinha a ser gerada
 * @returns Objeto com URL da imagem gerada e status de sucesso
 */
export const generateAiSticker = async (description: string): Promise<AiStickerResponse> => {
  if (!description) {
    throw new Error("Descrição para o sticker não pode estar vazia");
  }
  
  try {
    // Usamos nosso serviço de IA para gerar uma imagem com base na descrição
    const imageData = await generateImage(description);
    
    if (!imageData || !imageData.url) {
      return {
        url: '',
        success: false
      };
    }
    
    return {
      url: imageData.url,
      success: true
    };
  } catch (error) {
    errorLog(`Erro ao gerar sticker com IA: ${error}`);
    return {
      url: '',
      success: false
    };
  }
}; 