declare module 'global' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        MONGO_URI: string;
      }
    }
  }
}
