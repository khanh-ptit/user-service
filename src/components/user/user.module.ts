import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CreateUserService } from './commands/create-user.service';
import { GetListUserService } from './commands/get-list-user.service';

@Global()
@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, CreateUserService, GetListUserService],
  exports: [UserService],
})
export class UserModule {}
