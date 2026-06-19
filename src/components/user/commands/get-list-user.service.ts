import { Injectable } from '@nestjs/common';
import { GetListUserRequestDto } from '../dto/request/get-list-user.request.dto';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class GetListUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: GetListUserRequestDto) {
    const { docs, meta } = await this.userRepository.getList(query);
    return { items: docs, meta };
  }
}
