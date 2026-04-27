import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';

class CalculateUnitRequestItem {
  @IsNumber()
  @IsNotEmpty()
  itemId: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  unitId: number;
}

export class CalculateUnitRequestDto {
  @ValidateNested({ each: true })
  @Type(() => CalculateUnitRequestItem)
  @ArrayNotEmpty()
  items: CalculateUnitRequestItem[];
}
