import { Channel, connect } from 'amqplib';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

import { ConfigService } from '@app/config/config.service';
import { CreateConsumerOptionsDto } from './dto/create-consumer-optional.dto';
import { RabbitMqServiceInterface } from './interfaces/rabbitmq.service.interface';

@Injectable()
export class RabbitMqService implements RabbitMqServiceInterface, OnModuleInit {
  private readonly logger = new Logger(RabbitMqService.name);

  private connection;

  private channel: Channel;

  protected consumerTag: string | undefined;

  private readonly configService: ConfigService;

  constructor() {
    this.configService = new ConfigService();
  }

  async onModuleInit() {
    await this.connect();
  }

  async connect() {
    try {
      this.connection = await connect(
        this.configService.get('rabbitOption').options.urls[0],
      );

      this.channel = await this.connection.createChannel();

      this.logger.debug(`✅ RabbitMq connection is successful.`);
    } catch (error) {
      this.logger.error(`RabbitMq connection error: ${error.message}`);
    }
  }

  async addToQueue(queueName: string, message: object) {
    await this.channel.assertQueue(queueName, {
      durable: true,
    });

    return this.channel.sendToQueue(
      queueName,
      Buffer.from(JSON.stringify(message)),
    );
  }

  async createConsumer(
    queueName: string,
    callback: (id: any) => Promise<any>,
    options: CreateConsumerOptionsDto = {
      retries: 3,
      delay: 5000,
      prefetch: 1,
    },
  ) {
    this.logger.debug('REGISTER CONSUMER');
    const delayQueueName = queueName + '_delay';

    if (options.retries > 0 && options.delay > 0) {
      await this.channel.assertQueue(delayQueueName, {
        durable: true,
        arguments: {
          'x-dead-letter-exchange': '',
          'x-message-ttl': options.delay,
          'x-dead-letter-routing-key': queueName,
        },
      });
    }

    await this.channel.assertQueue(queueName);
    this.channel.prefetch(1);
    this.channel.consume(
      queueName,
      async (message) => {
        try {
          await callback(JSON.parse(message.content.toString()));
          await this.channel.ack(message);
        } catch (error) {
          console.error(error);
          const headers = message.properties.headers || {};
          const retries = headers['x-retry-count'] || 0;

          if (!options.delay || retries >= options.retries) {
            await this.channel.ack(message);
          } else {
            this.channel.sendToQueue(
              delayQueueName,
              Buffer.from(message.content),
              {
                headers: { 'x-retry-count': retries + 1 },
              },
            );
            await this.channel.ack(message);
          }
        }
      },
      {
        noAck: false,
      },
    );
  }
  async removeConsumer() {
    if (this.consumerTag) {
      await this.channel.cancel(this.consumerTag);
      this.consumerTag = undefined;
      this.logger.log('Consumer has been removed.');
    } else {
      this.logger.warn('No consumer to remove..');
    }
  }

  async close() {
    await this.channel.close();
    await this.connection.close();
  }
}
