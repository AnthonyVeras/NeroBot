/**
 * Funções reaproveitáveis
 * da biblioteca Baileys (comunicação com o WhatsApp).
 *
 * @author Anthony
 */
import { getBuffer, getRandomName } from "../utils";
import fs from "fs";
import path from "path";
import { TEMP_DIR, ASSETS_DIR } from "../config";
import { WaBotClient } from "../types/baileys";

interface ProfileImageData {
  buffer: Buffer;
  profileImage: string;
  success: boolean;
}

export const getProfileImageData = async (
  socket: WaBotClient,
  userJid: string
): Promise<ProfileImageData> => {
  let profileImage = "";
  let buffer: Buffer = Buffer.from([]);
  let success = true;

  try {
    // @ts-ignore
    profileImage = await socket.profilePictureUrl(userJid, "image");

    buffer = await getBuffer(profileImage);

    const tempImage = path.resolve(TEMP_DIR, getRandomName("png"));

    fs.writeFileSync(tempImage, buffer);

    profileImage = tempImage;
  } catch (error) {
    success = false;

    profileImage = path.resolve(ASSETS_DIR, "images", "default-user.png");

    buffer = fs.readFileSync(profileImage);
  }

  return { buffer, profileImage, success };
}; 