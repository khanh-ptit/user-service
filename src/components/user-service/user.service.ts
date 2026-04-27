import { ResponseCodeEnum } from '@app/constant/response-code.enum';
import { NatsClientService } from '@app/core/transporter/nats-transporter/nats-client.service';
import { NatsService } from '@app/core/transporter/nats-transporter/nats.config';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { isEmpty } from 'lodash';
import { UserResponseDto } from './dto/response/user.response.dto';
import { DepartmentSettingResponseDto } from './dto/response/department.response.dto';
import { BusinessException } from '@app/core/exception-filters/business-exception.filter';
import { UserDetailResponseDto } from './dto/response/user-detail.response.dto';

@Injectable()
export class UserService {
  constructor(private readonly natsClientService: NatsClientService) {}

  async getUserByIds(ids: number[], serilize?: boolean): Promise<any> {
    const response = await this.natsClientService.send(
      `${NatsService.USER}.get_users_by_ids`,
      {
        userIds: ids,
      },
    );
    if (response.statusCode !== ResponseCodeEnum.SUCCESS) return [];

    const dataReturn = plainToInstance(UserResponseDto, <any[]>response.data, {
      excludeExtraneousValues: true,
    });
    const serilizeUsers = {};
    if (serilize) {
      response.data.forEach((user) => {
        serilizeUsers[user.id] = user;
      });
      return serilizeUsers;
    }
    return dataReturn;
  }

  async getDepartmentByIds(
    ids: number[],
  ): Promise<DepartmentSettingResponseDto[]> {
    if (isEmpty(ids)) return [];
    const response = await this.natsClientService.send(
      `${NatsService.USER}.get_department_setting_by_ids`,
      {
        departmentSettingIds: ids,
      },
    );
    if (response.statusCode !== ResponseCodeEnum.SUCCESS) return [];

    return response?.data;
  }

  async getDefaultBuyerDepartment(): Promise<DepartmentSettingResponseDto> {
    const response = await this.natsClientService.send(
      `${NatsService.USER}.get_default_buyer_department`,
      {},
    );

    return response?.data;
  }

  async getUserDetail(id: number): Promise<UserDetailResponseDto> {
    const response = await this.natsClientService.send(
      `${NatsService.USER}.detail`,
      { id },
    );

    if (response.statusCode !== ResponseCodeEnum.SUCCESS)
      throw new BusinessException(response.message);

    return response?.data;
  }
}
