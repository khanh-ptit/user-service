import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsOptional,
  ValidateNested,
} from 'class-validator';

export class GetItemUnitConditionDto {
  @ApiProperty()
  @IsOptional()
  @IsInt()
  itemId: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  itemUnitSettingId: number;
}
export class GetItemUnitReqDto {
  @ApiProperty()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @IsArray()
  conditions: GetItemUnitConditionDto[];
}
