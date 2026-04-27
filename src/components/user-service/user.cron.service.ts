import { NatsClientService } from '@app/core/transporter/nats-transporter/nats-client.service';
import { NatsService } from '@app/core/transporter/nats-transporter/nats.config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserCronService {
  constructor(private readonly natsClientService: NatsClientService) {}

  async insertPermission(permissions): Promise<any> {
    return await this.natsClientService.send(
      `${NatsService.USER}.insert_permission`,
      permissions,
    );
  }

  async deletePermissionNotActive(): Promise<any> {
    return await this.natsClientService.send(
      `${NatsService.USER}.delete_permission_not_active`,
      {},
    );
  }
}
