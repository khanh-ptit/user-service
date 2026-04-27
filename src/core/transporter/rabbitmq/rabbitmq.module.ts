import { Global, Module } from '@nestjs/common';
import { ClientsModule, ClientsModuleOptions } from '@nestjs/microservices';

import { RabbitMqService } from './rabbitmq.service';
import { ConfigService } from '@app/config/config.service';
import { PURCHASED_REQUEST_QUEUE } from './rabbitmq.constants';

const configService = new ConfigService();

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: PURCHASED_REQUEST_QUEUE,
        ...configService.get('rabbitOption'),
      },
    ] as ClientsModuleOptions),
  ],
  providers: [
    {
      provide: 'RabbitMqServiceInterface',
      useClass: RabbitMqService,
    },
  ],
  exports: [
    ClientsModule.register([
      {
        name: PURCHASED_REQUEST_QUEUE,
        ...configService.get('rabbitOption'),
      },
    ] as ClientsModuleOptions),
    {
      provide: 'RabbitMqServiceInterface',
      useClass: RabbitMqService,
    },
  ],
})
export class RabbitMqModule {}
