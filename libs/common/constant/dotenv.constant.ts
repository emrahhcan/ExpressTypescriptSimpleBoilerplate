import { config } from 'dotenv';

config();

export const IS_PROD = (process.env.NODE_ENV as string) === 'production';

export const CLIENT_URL = IS_PROD
  ? (process.env.CLIENT_URL_PROD as string)
  : (process.env.CLIENT_URL_DEV as string);

export const MONGO_DB_CONN = IS_PROD
  ? process.env.MONGO_DB_CONN_PROD
  : process.env.MONGO_DB_CONN_DEV;

export const PORT = process.env.PORT || 4000;

export const MAIL_HOST = process.env.MAIL_HOST;
export const MAIL_USER = process.env.MAIL_USER;
export const MAIL_PASS = process.env.MAIL_PASS;

export const SOME_API_KEY = process.env.SOME_API_KEY as string;
