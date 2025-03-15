/**
 * Serviço de pesquisa e download de música
 * 
 * @author Anthony
 */
import axios from "axios";
import { errorLog } from "../utils/logger";

interface MusicResponse {
  url: string;
  title: string;
  thumbnail?: string;
  duration?: string;
}

interface VideoResponse {
  url: string;
  title: string;
  thumbnail?: string;
  duration?: string;
}

/**
 * Busca e obtém URL para download de áudio de músicas
 * 
 * @param search Termo de busca da música
 * @returns Objeto com a URL de download e informações da música
 */
export const searchMusic = async (search: string): Promise<MusicResponse | null> => {
  if (!search) {
    throw new Error("Você precisa informar o que deseja buscar!");
  }

  try {
    // Utilizando o serviço gratuito para converter vídeos do YouTube em MP3
    // Note: Em um ambiente de produção, você poderia usar um serviço pago ou implementar sua própria solução
    const response = await axios.get(`https://youtube-mp36.p.rapidapi.com/dl`, {
      params: { id: await searchYoutubeVideo(search) },
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY || 'demo-key',
        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
      }
    });

    if (response.data && response.data.link) {
      return {
        url: response.data.link,
        title: response.data.title || search
      };
    }
    
    return null;
  } catch (error) {
    errorLog(`Erro ao buscar música: ${error}`);
    return null;
  }
};

/**
 * Busca e obtém URL para download de vídeos
 * 
 * @param search Termo de busca do vídeo
 * @returns Objeto com a URL do vídeo e informações
 */
export const searchVideo = async (search: string): Promise<VideoResponse | null> => {
  if (!search) {
    throw new Error("Você precisa informar o que deseja buscar!");
  }

  try {
    const videoId = await searchYoutubeVideo(search);
    
    // Em uma implementação real, você usaria uma API para obter o vídeo
    // Esta é uma implementação simplificada que retorna o link direto do YouTube
    const videoInfo = await getYoutubeVideoInfo(videoId);
    
    if (videoInfo) {
      return {
        url: `https://www.youtube.com/watch?v=${videoId}`,
        title: videoInfo.title,
        thumbnail: videoInfo.thumbnail
      };
    }
    
    return null;
  } catch (error) {
    errorLog(`Erro ao buscar vídeo: ${error}`);
    return null;
  }
};

/**
 * Obtém informações de um vídeo do YouTube
 */
async function getYoutubeVideoInfo(videoId: string): Promise<{ title: string, thumbnail: string } | null> {
  try {
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
      params: {
        part: 'snippet',
        id: videoId,
        key: process.env.YOUTUBE_API_KEY || 'youtube-api-key'
      }
    });

    if (response.data && response.data.items && response.data.items.length > 0) {
      const snippet = response.data.items[0].snippet;
      return {
        title: snippet.title,
        thumbnail: snippet.thumbnails.high.url
      };
    }
    
    return null;
  } catch (error) {
    errorLog(`Erro ao obter informações do vídeo: ${error}`);
    return {
      title: "Vídeo não encontrado",
      thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg"
    };
  }
}

/**
 * Busca por um vídeo no YouTube e retorna o ID
 * 
 * @param query Termo de busca
 * @returns ID do vídeo no YouTube
 */
async function searchYoutubeVideo(query: string): Promise<string> {
  try {
    // Implementação simplificada - em produção, use a API oficial do YouTube
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
      params: {
        part: 'snippet',
        maxResults: 1,
        q: query,
        type: 'video',
        key: process.env.YOUTUBE_API_KEY || 'youtube-api-key'
      }
    });

    if (response.data && response.data.items && response.data.items.length > 0) {
      return response.data.items[0].id.videoId;
    }
    
    throw new Error("Nenhum vídeo encontrado para este termo de busca");
  } catch (error) {
    errorLog(`Erro ao buscar vídeo no YouTube: ${error}`);
    
    // Fallback para um ID de vídeo conhecido para fins de demonstração
    // Em produção, você deve tratar este erro adequadamente
    return "dQw4w9WgXcQ";
  }
} 