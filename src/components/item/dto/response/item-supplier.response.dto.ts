import { BaseResponseDto } from '@app/core/dto/base-response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ItemSupplierStatusEnum } from '../../item.constant';

export class ItemSupplierDto extends BaseResponseDto {
  @ApiProperty()
  @Expose()
  itemId: number;

  @ApiProperty()
  @Expose()
  itemNameVn: string;

  @ApiProperty()
  @Expose()
  itemNameEn: string;

  @ApiProperty()
  @Expose()
  partNo: string;

  @ApiProperty()
  @Expose()
  maker: string;

  @ApiProperty()
  @Expose()
  source: string;

  @ApiProperty()
  @Expose()
  itemUnitId: number;

  @ApiProperty()
  @Expose()
  leadTime: number;

  @ApiProperty()
  @Expose()
  moq: number;

  @ApiProperty()
  @Expose()
  note: string;

  @ApiProperty()
  @Expose()
  status: ItemSupplierStatusEnum;
}
