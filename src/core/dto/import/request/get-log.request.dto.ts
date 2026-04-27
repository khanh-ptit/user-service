import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseDto } from '../../base.dto';

export class GetLogRequestDto extends BaseDto {
  @ApiProperty({
    description: 'Name of the log file',
  })
  @IsString()
  @IsNotEmpty()
  token: string;
}
