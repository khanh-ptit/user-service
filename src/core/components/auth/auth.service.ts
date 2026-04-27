import { NatsClientService } from '@app/core/transporter/nats-transporter/nats-client.service';
import { NatsService } from '@app/core/transporter/nats-transporter/nats.config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private readonly natsClientService: NatsClientService) {}

  async validateToken(token: string, permissionCode: string): Promise<any> {
    const response = await this.natsClientService.send(
      `${NatsService.AUTH}.validate_token`,
      {
        permissionCode,
        token,
      },
    );
    return response;
  }
}
