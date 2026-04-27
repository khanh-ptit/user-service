import { IsMongoId, IsNotEmpty } from 'class-validator';
import { BaseDto } from './base.dto';

export class IdMongoParamDto extends BaseDto {
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}
