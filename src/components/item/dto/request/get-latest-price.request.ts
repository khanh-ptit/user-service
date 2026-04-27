import { BaseDto } from '@app/core/dto/base.dto';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class GetLatestPriceItem {
  @IsOptional()
  @IsNumber()
  itemId: number;

  @IsOptional()
  @IsString()
  partNo: string;

  @IsOptional()
  @IsMongoId()
  makerId: string;

  @IsOptional()
  @IsMongoId()
  supplierId: string;

  @IsOptional()
  @IsNumber()
  itemSupplierId: number;
}

export class GetLatestPriceRequest extends BaseDto {
  @ValidateNested({ each: true })
  @Type(() => GetLatestPriceItem)
  @ArrayNotEmpty()
  conditions: GetLatestPriceItem[];
}
