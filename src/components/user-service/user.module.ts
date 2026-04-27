import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCronService } from './user.cron.service';

@Global()
@Module({
  imports: [],
  providers: [UserService, UserCronService],
  exports: [UserService, UserCronService],
})
export class UserModule {}
