export interface Logger {
  info: (message: string, ...args: any[]) => void;
  error: (message: string, error?: Error, ...args: any[]) => void;
  warn: (message: string, ...args: any[]) => void;
  debug: (message: string, ...args: any[]) => void;
}

export interface ConfigOptions {
  prefix: string;
  ownerNumber: string;
  botName: string;
  botEmoji: string;
  primaryColor: string;
  version: string;
  maxCooldown: number;
  commandsDir: string;
  [key: string]: any;
}

export interface CacheManager {
  get: <T>(key: string) => T | undefined;
  set: <T>(key: string, value: T, ttl?: number) => void;
  delete: (key: string) => boolean;
  has: (key: string) => boolean;
  clear: () => void;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode?: number;
}

export interface FileUtils {
  readFile: (path: string) => Promise<string>;
  writeFile: (path: string, data: string) => Promise<void>;
  fileExists: (path: string) => Promise<boolean>;
  createDirectory: (path: string) => Promise<void>;
} 