import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: 'postgres',
  host: process.env.DATABASE_POSTGRES_HOST,
  port: parseInt(process.env.DATABASE_POSTGRES_PORT || '5432'),
  username: process.env.DATABASE_POSTGRES_USERNAME,
  password: process.env.DATABASE_POSTGRES_PASSWORD,
  database: process.env.DATABASE_NAME,
  logging: process.env.NODE_ENV === 'development',
  synchronize: false, // Turned off to rely safely on migrations
}));
