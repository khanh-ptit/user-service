import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class FileResponseDto {
  @Expose()
  @ApiProperty()
  fileId: string;

  @Expose()
  @ApiProperty()
  filename: string;
}
