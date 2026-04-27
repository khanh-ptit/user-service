import { BaseDto } from '@app/core/dto/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsInt } from 'class-validator';

export class IdsRequestDto extends BaseDto {
  @ApiProperty()
  @IsInt({ each: true })
  @ArrayNotEmpty()
  @IsArray()
  ids: [];
}
