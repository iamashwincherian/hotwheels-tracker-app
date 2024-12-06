export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SMTP_SERVER_USERNAME: string;
      SMTP_SERVER_PASSWORD: string;
      SEND_EMAIL: bool;
    }
  }
}
