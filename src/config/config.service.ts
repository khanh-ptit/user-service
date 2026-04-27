import { Transport } from '@nestjs/microservices';

import { PURCHASED_REQUEST_QUEUE } from '@app/core/transporter/rabbitmq/rabbitmq.constants';

export class ConfigService {
  private readonly envConfig: { [key: string]: any } | null = null;

  constructor() {
    process.env.TZ = 'Asia/Ho_Chi_Minh';
    this.envConfig = {
      port: process.env.SERVER_PORT,
      serviceName: process.env.SERVICE_NAME,
      httpPort: process.env.SERVER_HTTP_PORT,
      containerPort: process.env.APP_CONTAINER_PORT,
      cpuCores: process.env.CPU_CORES || 1,
      otherGroupId: process.env.OTHER_CODE_GROUP || '001',
      defaultTimeZone: process.env.TZ,
      natServers: process.env.NAT_SERVERS?.split(',') || ['nats://nats:4222'],
    };
    this.envConfig.corsOrigin = {
      origin: true,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
    };
    this.envConfig.internalToken =
      process.env.INTERNAL_TOKEN ||
      't5AQ1il1FtOk6Pp9FEW0VbwYETYqqseisgvo0ZCchayvvsQYFSkNzP7bNZ7vEFr0B1Hd4Ft3KGls1q2Irc20Yv1juslgTgtP4lavfeFiw7qBDDzw5D5Y7vMxoIfkpEqcViZqcPy3K2TCOqzCVGAQjJ4bvmX01xeCqILT5ewBd7fL3hZ4jBlSYmbiIefVIiRzeFhWCYOuVpS4Ng4lPcEBvUorm5zlLAci65UKdKtoXbPtWp2A1jrE5D';
    this.envConfig.baseUri = process.env.BASE_URI;
    this.envConfig.fileUri = process.env.FILE_SEVICE_URL;
    this.envConfig.gatewayPort = process.env.API_GATEWAY_PORT;

    this.envConfig.rabbitOption = {
      transport: Transport.RMQ,
      options: {
        urls: [
          process.env.RABBITMQ_CONNECTION ||
            'amqp://admin:snp2021213@rabbitmq:5672',
        ],
        host: this.envConfig.RABBITMQ_HOST || 'rabbitmq',
        port: this.envConfig.RABBITMQ_PORT || 5672,
        queue: PURCHASED_REQUEST_QUEUE,
        noAck: true,
        queueOptions: {
          durable: false,
        },
      },
    };

    this.envConfig.notificationService = {
      options: {
        port: process.env.NOTIFICATION_SERVICE_PORT || 3000,
        host: process.env.NOTIFICATION_SERVICE_HOST || 'notification-service',
      },
      transport: Transport.TCP,
    };

    this.envConfig.fileService = {
      options: {
        port: process.env.FILE_SERVICE_PORT || 3001,
        host: process.env.FILE_SERVICE_HOST || 'file-service',
      },
      transport: Transport.TCP,
    };
  }

  get(key: string): any {
    return this.envConfig ? this.envConfig[key] : null;
  }
}
