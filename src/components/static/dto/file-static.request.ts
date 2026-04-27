import { FILE_NAME_ENUM } from '@app/constant/import.constant';
import { BaseDto } from '@app/core/dto/base.dto';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsEnum } from 'class-validator';

export class FileStaticRequest extends BaseDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsEnum(FILE_NAME_ENUM)
  fileName: number;
}
