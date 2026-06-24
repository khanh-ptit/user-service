import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { CreateUserRequestDto } from '../dto/request/create-user.request.dto';
import { CreateUserValidator } from '../validators/create-user.validator';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from '../dto/response/user.response.dto';

@Injectable()
export class CreateUserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly createUserValidator: CreateUserValidator,
  ) {}

  async execute(body: CreateUserRequestDto) {
    await this.createUserValidator.validate(body);
    const newUser = this.userRepository.createEntity(body);
    const data = await this.userRepository.create(newUser);

    const returnData = plainToInstance(UserResponseDto, data, {
      excludeExtraneousValues: true,
    });
    return { data: returnData };
  }
}
