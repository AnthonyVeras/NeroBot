declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      PREFIX: string;
      OWNER_NUMBER: string;
      [key: string]: string | undefined;
    }
  }
}

export {}; 