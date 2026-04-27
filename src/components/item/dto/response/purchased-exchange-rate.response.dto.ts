import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { STATUS_ENUM } from '../../item.constant';

export class PurchasedExchangeRateDto {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the exchange rate record',
  })
  @Expose()
  id: number;

  @ApiProperty({ example: 1001, description: 'ID of the root currency' })
  @Expose()
  rootCurrencyId: number;

  @ApiProperty({ example: 1002, description: 'ID of the converted currency' })
  @Expose()
  convertCurrencyId: number;

  @ApiProperty({
    example: 1.25,
    description: 'Sell exchange rate (from root to convert currency)',
  })
  @Expose()
  sellExchangeRate: number;

  @ApiProperty({
    example: 1.22,
    description: 'Buy exchange rate (from convert to root currency)',
  })
  @Expose()
  buyExchangeRate: number;

  @ApiProperty({ example: 1.235, description: 'General exchange rate applied' })
  @Expose()
  exchangeRate: number;

  @ApiProperty({
    example: '2025-10-15T00:00:00.000Z',
    description: 'The effective time this exchange rate applies',
  })
  @Expose()
  applyTime: Date;

  @ApiProperty({
    enum: STATUS_ENUM,
    example: STATUS_ENUM.ACTIVE,
    description: 'Current status of the exchange rate',
  })
  @Expose()
  status: STATUS_ENUM;

  @ApiProperty({ example: 5, description: 'User ID who created this record' })
  @Expose()
  createdBy: number;
}
