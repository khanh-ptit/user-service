import { PaginationQuery } from '@app/utils/pagination.query';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ListItemSupplierRequestDto extends PaginationQuery {
  @ApiProperty()
  @IsOptional()
  @IsString()
  toCurrencyId?: string;
}
