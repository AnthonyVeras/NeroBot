/**
 * Utilitário de log
 * @author Anthony
 */
import { version } from '../../package.json';

export const sayLog = (message: string): void => {
  console.log("\x1b[36m[NERO BOT | TALK]\x1b[0m", message);
};

export const inputLog = (message: string): void => {
  console.log("\x1b[30m[NERO BOT | INPUT]\x1b[0m", message);
};

export const infoLog = (message: string): void => {
  console.log("\x1b[34m[NERO BOT | INFO]\x1b[0m", message);
};

export const successLog = (message: string): void => {
  console.log("\x1b[32m[NERO BOT | SUCCESS]\x1b[0m", message);
};

export const errorLog = (message: string): void => {
  console.log("\x1b[31m[NERO BOT | ERROR]\x1b[0m", message);
};

export const warningLog = (message: string): void => {
  console.log("\x1b[33m[NERO BOT | WARNING]\x1b[0m", message);
};

export const bannerLog = (): void => {
  console.log(`\x1b[31m░█▄░█░█▀▀░█▀▄░█▀█░░░█▀▄░█▀█░▀█▀\x1b[0m`);
  console.log(`░█░▀█░█▀▀░█▀▄░█░█░░░█▀▄░█░█░░█░`);
  console.log(`\x1b[31m░▀░░▀░▀▀▀░▀░▀░▀▀▀░░░▀▀░░▀▀▀░░▀░\x1b[0m`);
  console.log(`\x1b[31m🤖 Versão: \x1b[0m${version}\n`);
}; 