/**
 * Funções úteis para trabalhar
 * com dados.
 *
 * @author Anthony
 */
import path from "path";
import fs from "fs";

const databasePath = path.resolve(__dirname, "..", "..", "database");

const INACTIVE_GROUPS_FILE = "inactive-groups";
const NOT_WELCOME_GROUPS_FILE = "not-welcome-groups";
const INACTIVE_AUTO_RESPONDER_GROUPS_FILE = "inactive-auto-responder-groups";
const ANTI_LINK_GROUPS_FILE = "anti-link-groups";

interface AutoResponderItem {
  match: string;
  answer: string;
}

function createIfNotExists(fullPath: string): void {
  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, JSON.stringify([]));
  }
}

function readJSON<T>(jsonFile: string): T {
  const fullPath = path.resolve(databasePath, `${jsonFile}.json`);

  createIfNotExists(fullPath);

  return JSON.parse(fs.readFileSync(fullPath, "utf8"));
}

function writeJSON<T>(jsonFile: string, data: T): void {
  const fullPath = path.resolve(databasePath, `${jsonFile}.json`);

  createIfNotExists(fullPath);

  fs.writeFileSync(fullPath, JSON.stringify(data));
}

export const activateGroup = (groupId: string): void => {
  const filename = INACTIVE_GROUPS_FILE;

  const inactiveGroups: string[] = readJSON(filename);

  const index = inactiveGroups.indexOf(groupId);

  if (index === -1) {
    return;
  }

  inactiveGroups.splice(index, 1);

  writeJSON(filename, inactiveGroups);
};

export const deactivateGroup = (groupId: string): void => {
  const filename = INACTIVE_GROUPS_FILE;

  const inactiveGroups: string[] = readJSON(filename);

  if (!inactiveGroups.includes(groupId)) {
    inactiveGroups.push(groupId);
  }

  writeJSON(filename, inactiveGroups);
};

export const isActiveGroup = (groupId: string): boolean => {
  const filename = INACTIVE_GROUPS_FILE;

  const inactiveGroups: string[] = readJSON(filename);

  return !inactiveGroups.includes(groupId);
};

export const activateWelcomeGroup = (groupId: string): void => {
  const filename = NOT_WELCOME_GROUPS_FILE;

  const notWelcomeGroups: string[] = readJSON(filename);

  const index = notWelcomeGroups.indexOf(groupId);

  if (index === -1) {
    return;
  }

  notWelcomeGroups.splice(index, 1);

  writeJSON(filename, notWelcomeGroups);
};

export const deactivateWelcomeGroup = (groupId: string): void => {
  const filename = NOT_WELCOME_GROUPS_FILE;

  const notWelcomeGroups: string[] = readJSON(filename);

  if (!notWelcomeGroups.includes(groupId)) {
    notWelcomeGroups.push(groupId);
  }

  writeJSON(filename, notWelcomeGroups);
};

export const isActiveWelcomeGroup = (groupId: string): boolean => {
  const filename = NOT_WELCOME_GROUPS_FILE;

  const notWelcomeGroups: string[] = readJSON(filename);

  return !notWelcomeGroups.includes(groupId);
};

export const getAutoResponderResponse = (match: string): string | null => {
  const filename = "auto-responder";

  const responses: AutoResponderItem[] = readJSON(filename);

  const matchUpperCase = match.toLocaleUpperCase();

  const data = responses.find(
    (response) => response.match.toLocaleUpperCase() === matchUpperCase
  );

  if (!data) {
    return null;
  }

  return data.answer;
};

export const activateAutoResponderGroup = (groupId: string): void => {
  const filename = INACTIVE_AUTO_RESPONDER_GROUPS_FILE;

  const inactiveAutoResponderGroups: string[] = readJSON(filename);

  const index = inactiveAutoResponderGroups.indexOf(groupId);

  if (index === -1) {
    return;
  }

  inactiveAutoResponderGroups.splice(index, 1);

  writeJSON(filename, inactiveAutoResponderGroups);
};

export const deactivateAutoResponderGroup = (groupId: string): void => {
  const filename = INACTIVE_AUTO_RESPONDER_GROUPS_FILE;

  const inactiveAutoResponderGroups: string[] = readJSON(filename);

  if (!inactiveAutoResponderGroups.includes(groupId)) {
    inactiveAutoResponderGroups.push(groupId);
  }

  writeJSON(filename, inactiveAutoResponderGroups);
};

export const isActiveAutoResponderGroup = (groupId: string): boolean => {
  const filename = INACTIVE_AUTO_RESPONDER_GROUPS_FILE;

  const inactiveAutoResponderGroups: string[] = readJSON(filename);

  return !inactiveAutoResponderGroups.includes(groupId);
};

export const activateAntiLinkGroup = (groupId: string): void => {
  const filename = ANTI_LINK_GROUPS_FILE;

  const antiLinkGroups: string[] = readJSON(filename);

  if (!antiLinkGroups.includes(groupId)) {
    antiLinkGroups.push(groupId);
  }

  writeJSON(filename, antiLinkGroups);
};

export const deactivateAntiLinkGroup = (groupId: string): void => {
  const filename = ANTI_LINK_GROUPS_FILE;

  const antiLinkGroups: string[] = readJSON(filename);

  const index = antiLinkGroups.indexOf(groupId);

  if (index === -1) {
    return;
  }

  antiLinkGroups.splice(index, 1);

  writeJSON(filename, antiLinkGroups);
};

export const isActiveAntiLinkGroup = (groupId: string): boolean => {
  const filename = ANTI_LINK_GROUPS_FILE;

  const antiLinkGroups: string[] = readJSON(filename);

  return antiLinkGroups.includes(groupId);
}; 