import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { CreateUserRequestDto } from '../dto/request/create-user.request.dto';

@Injectable()
export class CreateUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(body: CreateUserRequestDto) {
    const newUser = this.userRepository.createEntity(body);
    await this.userRepository.create(newUser);
    return newUser;
  }
}
