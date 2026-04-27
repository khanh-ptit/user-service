import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigFactory } from '@nestjs/config';
import configs from '@app/config';
import { DatabaseModule } from './database/database.module';
import {
  HeaderResolver,
  I18nJsonLoader,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import * as path from 'path';
import { BootModule } from '@nestcloud/boot';
import { KongGatewayModule } from './core/components/kong-gateway/kong-gateway.module';
import { ConsulModule } from '@nestcloud/consul';
import { ServiceModule } from '@nestcloud/service';
import { BOOT, CONSUL } from '@nestcloud/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from './core/pipe/validation.pipe';
import { AuthorizationGuard } from './core/guards/authorization.guard';
import { AuthModule } from './core/components/auth/auth.module';
import { NatsClientModule } from './core/transporter/nats-transporter/nats-client.module';
import { FileModule } from './core/components/file/file.module';
import { HttpClientModule } from './core/components/http-client/http-client.module';
import { RabbitMqModule } from './core/transporter/rabbitmq/rabbitmq.module';
import { UserModule } from './components/user-service/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: configs as ConfigFactory[],
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'vi',
      loader: I18nJsonLoader,
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang', 'locale', 'l'] },
        { use: HeaderResolver, options: ['lang', 'locale', 'l'] },
      ],
    }),
    BootModule.forRoot({
      filePath: path.resolve(__dirname, '../config.yaml'),
    }),
    ConsulModule.forRootAsync({ inject: [BOOT] }),
    ServiceModule.forRootAsync({ inject: [BOOT, CONSUL] }),
    KongGatewayModule.forRootAsync(),
    DatabaseModule.forRoot(),
    NatsClientModule,
    AuthModule,
    HttpClientModule,
    FileModule,
    RabbitMqModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: AuthorizationGuard,
    },
    AppService,
  ],
})
export class AppModule {}
