import { config } from 'dotenv';
import { CONFIG_KEYS } from './configKeys';

export type Config = {
  appHost: string;
  appPort: number;
  corsOrigins?: string;
  mongoUri: string;
};

config();

export const env: Config = {
  appHost: process.env[CONFIG_KEYS.APP_HOST] || 'localhost',
  appPort: parseInt(process.env[CONFIG_KEYS.APP_PORT] || '3000'),
  corsOrigins: process.env[CONFIG_KEYS.CORS_ORIGINS],
  mongoUri: process.env[CONFIG_KEYS.MONGO_URI] || '',
};
