import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseProviders } from './database.provider';
import { databaseEntities } from './database.entities';

@Global()
@Module({})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => {
            return {
              type: 'postgres',
              host: configService.get<string>('database.host'),
              port: configService.get<number>('database.port'),
              username: configService.get<string>('database.username'),
              password: configService.get<string>('database.password'),
              database: configService.get<string>('database.database'),
              entities: databaseEntities,
              synchronize: configService.get<boolean>('database.synchronize'),
              logging: configService.get<boolean>('database.logging'),
              migrations: [__dirname + '/migration/*{.ts,.js}'],
              migrationsRun: true,
            };
          },
          inject: [ConfigService],
        }),
        TypeOrmModule.forFeature(databaseEntities),
      ],
      providers: databaseProviders,
      exports: [TypeOrmModule, ...databaseProviders],
    };
  }
}
