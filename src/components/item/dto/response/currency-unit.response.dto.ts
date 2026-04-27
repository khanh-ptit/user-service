import { BaseResponseDto } from '@app/core/dto/base-response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

class ExchangeRateResponseDto extends BaseResponseDto {
  @ApiProperty()
  @Expose()
  rate: number;
}

export class CurrencyUnitDto extends BaseResponseDto {
  @ApiProperty()
  @Expose()
  status: number;

  @ApiProperty()
  @Expose()
  description: string;

  @ApiProperty()
  @Expose()
  createdByUserId: number;

  @ApiProperty()
  @Expose()
  createdAt: string;

  @ApiProperty()
  @Expose()
  updatedAt: string;

  @ApiProperty()
  @Type(() => ExchangeRateResponseDto)
  @Expose()
  exchangeRate: ExchangeRateResponseDto;
}
