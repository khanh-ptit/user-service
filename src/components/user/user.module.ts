import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CreateUserService } from './commands/create-user.service';

@Global()
@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, CreateUserService],
  exports: [UserService],
})
export class UserModule {}
