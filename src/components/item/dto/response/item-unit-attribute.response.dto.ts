import { Expose } from 'class-transformer';

export class ItemUnitAttrResDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  code: string;

  @Expose()
  itemId: number;

  @Expose()
  unitId: number;

  @Expose()
  conversionRate?: number;

  @Expose()
  isPrimaryUnit?: boolean;
}
