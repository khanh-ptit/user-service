import { Global, Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { NatsClientService } from './nats-client.service';
import { NatsConfig } from './nats.config';

@Global()
@Module({
  providers: [
    {
      provide: 'NATS_CLIENT_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create(NatsConfig);
      },
    },
    NatsClientService,
  ],
  exports: [NatsClientService],
})
export class NatsClientModule {}
