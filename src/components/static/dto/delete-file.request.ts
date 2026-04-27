import { BaseDto } from '@app/core/dto/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteFileReqDto extends BaseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  filename: string;
}
