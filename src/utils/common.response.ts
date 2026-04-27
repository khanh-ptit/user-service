import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class Meta {
  @ApiProperty({ example: 1 })
  @Expose()
  total: number;

  @ApiProperty({ example: 1 })
  @Expose()
  page: number;
}
