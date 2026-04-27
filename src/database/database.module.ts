import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseProviders } from './database.provider';
import { databaseSchema } from './database.schema';
import * as mongoose from 'mongoose';

@Global()
@Module({})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => {
            const username = configService.get<string>('database.username');
            const password = configService.get<string>('database.password');
            const host = configService.get<string>('database.host');
            const port = configService.get<number>('database.port');
            const database = configService.get<string>('database.database');
            const authSource = configService.get<string>('database.authSource');
            const mongoUri = `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=${authSource}`;
            const logging = configService.get<boolean>('database.logging');

            mongoose.set('debug', logging);

            return {
              uri: mongoUri,
              maxPoolSize: 10,
              minPoolSize: 2,
              maxIdleTimeMS: 30000,
              serverSelectionTimeoutMS: 5000,
              heartbeatFrequencyMS: 10000,
              retryWrites: true,
            };
          },
          inject: [ConfigService],
        }),
        MongooseModule.forFeature(databaseSchema),
      ],
      providers: databaseProviders,
      exports: databaseProviders,
    };
  }
}
