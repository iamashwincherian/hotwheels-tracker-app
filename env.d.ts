export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SMTP_SERVER_USERNAME: string;
      SMTP_SERVER_PASSWORD: string;
      BLOB_READ_WRITE_TOKEN: string;
      DATA_FILE_NAME: string;
      SEND_EMAIL: string;
      NEXT_PUBLIC_SUPABASE_URL: string;
      NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
      SUPABASE_STORAGE_BUCKET_NAME: string;
    }
  }
}
