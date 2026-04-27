import { Transform, Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { first } from 'lodash';
import { BaseDto } from '../../base.dto';
import { FileAbstractDto } from '@app/core/dto/file-upload.request';

export class ImportFileRequestDto extends BaseDto {
  @Type(() => FileAbstractDto)
  @Transform(({ value }) => first(value))
  @IsNotEmpty()
  file: FileAbstractDto;
}
