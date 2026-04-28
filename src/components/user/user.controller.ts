import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserRequestDto } from './dto/request/create-user.request.dto';
import { CreateUserService } from './commands/create-user.service';

@Controller('')
export class UserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post('')
  create(@Body() body: CreateUserRequestDto) {
    return this.createUserService.execute(body);
  }
}
