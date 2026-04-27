import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class GetLogResponseDto {
  @ApiProperty({ description: 'Log file name' })
  @Expose()
  fileName: string;

  @ApiProperty({ description: 'Log file content' })
  @Expose()
  fileContent: string;
}
