import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FileService } from './file.service';
import { ConfigService } from '@app/config/config.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [ConfigService, FileService],
  exports: [FileService],
})
export class FileModule {}
