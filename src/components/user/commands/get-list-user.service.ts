import { Injectable } from '@nestjs/common';
import { GetListUserRequestDto } from '../dto/request/get-list-user.request.dto';
import { UserRepository } from '../repository/user.repository';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from '../dto/response/user.response.dto';

@Injectable()
export class GetListUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: GetListUserRequestDto) {
    const { docs, meta } = await this.userRepository.getList(query);
    const returnData = plainToInstance(UserResponseDto, docs, {
      excludeExtraneousValues: true,
    });
    return { items: returnData, meta };
  }
}
