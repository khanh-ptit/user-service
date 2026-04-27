import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';

export class GetPurchasedExchangeRateCondition {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  rootCurrencyCode: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  convertCurrencyCode: string;
}
export class GetPurchasedExchangeRatesRequestDto {
  @ApiProperty()
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  conditions: GetPurchasedExchangeRateCondition[];
}
