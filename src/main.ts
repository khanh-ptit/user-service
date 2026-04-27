import fastifyMultipart from '@fastify/multipart';
import { NestFactory } from '@nestjs/core';
import { NatsOptions } from '@nestjs/microservices';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { APIPrefix } from './common/common';
import { ConfigService } from './config/config.service';
import { LoggerConfig } from './config/logger.config';
import { BusinessExceptionFilter } from './core/exception-filters/business-exception.filter';
import { MultipartBodyInterceptor } from './core/interceptors/multipart-to-body.interceptor';
import { TransformInterceptor } from './core/interceptors/transform.interceptor';
import { NatsConfig } from './core/transporter/nats-transporter/nats.config';
import { RequestContextMiddleware } from './middleware/request-context.middleware';
import * as path from 'path';

async function bootstrap() {
  const fastifyAdapter = new FastifyAdapter();
  const configService = new ConfigService();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  fastifyAdapter.register(fastifyMultipart, {
    // attachFieldsToBody: true,
    // addToBody: true,
    // limits: {
    //   fileSize: configService.get('maxFileSize'),
    // },
  });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
    {
      logger: LoggerConfig,
    },
  );

  app.connectMicroservice<NatsOptions>(NatsConfig, { inheritAppConfig: true });

  await app.startAllMicroservices();

  app.setGlobalPrefix(APIPrefix.Version);
  const options = new DocumentBuilder()
    .setTitle('API docs')
    .addBearerAuth(
      { type: 'http', description: 'Access token' },
      'access-token',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/v1/purchased-requests/swagger-docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  const corsOptions = configService.get('corsOrigin') || {};

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  app.register(require('@fastify/cors'), corsOptions);

  const requestContextMiddleware = new RequestContextMiddleware();
  app.use(requestContextMiddleware.use.bind(requestContextMiddleware));

  // app.useGlobalPipes(new SortQueryPipe());
  // app.useGlobalPipes(new FilterQueryPipe());
  app.useGlobalInterceptors(
    new TransformInterceptor(),
    new MultipartBodyInterceptor(),
  );
  app.useGlobalFilters(new BusinessExceptionFilter());

  await app.listen(new ConfigService().get('httpPort'), '0.0.0.0', () => {
    console.log(
      'API docs:',
      'http://localhost:' +
        new ConfigService().get('containerPort') +
        '/api/v1/purchased-requests/swagger-docs',
    );
  });
}

export const SRC_DIR = __dirname;
export const DATA_DIR = path.dirname(process.execPath);

bootstrap();
