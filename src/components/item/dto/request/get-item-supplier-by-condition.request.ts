import { BaseDto } from '@app/core/dto/base.dto';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class GetInternalItemSupplierRequest {
  @IsString({ each: true })
  @IsOptional()
  partNos?: string[];

  @IsInt({ each: true })
  @IsArray()
  @IsOptional()
  ids?: number[];

  @IsInt({ each: true })
  @IsArray()
  @IsOptional()
  itemIds?: number[];

  @IsBoolean()
  @IsOptional()
  isExistPartNo?: boolean;
}

export class ItemSupplierKeyDto {
  @IsNotEmpty()
  @IsNumber()
  itemId: number;

  @IsOptional()
  @IsString()
  partNo: string;
}

export class CheckDuplicateItemSupplierRequestDto extends BaseDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemSupplierKeyDto)
  keys: ItemSupplierKeyDto[];
}
