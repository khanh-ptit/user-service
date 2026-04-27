import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: 'mongodb',
  host: process.env.DATABASE_MONGO_HOST,
  port: parseInt(process.env.DATABASE_MONGO_PORT || '27017'),
  maxPool: parseInt(process.env.DATABASE_MAX_POOL || '20'),
  username: process.env.DATABASE_MONGO_USERNAME,
  password: process.env.DATABASE_MONGO_PASSWORD,
  database: process.env.DATABASE_NAME,
  authSource: process.env.DATABASE_AUTH_SOURCE || 'admin',
  logging: process.env.NODE_ENV === 'development',
}));
