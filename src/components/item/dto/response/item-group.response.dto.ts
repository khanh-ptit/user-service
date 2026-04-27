import { BaseResponseDto } from '@app/core/dto/base-response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class ItemGroupDto extends BaseResponseDto {
  @ApiProperty()
  @Expose()
  description: string;

  @ApiProperty()
  @Expose()
  level: number;

  @ApiProperty()
  @Expose()
  rootId: number;

  @ApiProperty()
  @Expose()
  status: number;

  @ApiProperty()
  @Expose()
  mPath: string;

  @ApiProperty()
  @Expose()
  parentId: number;

  @ApiProperty({ type: () => ItemGroupDto, nullable: true })
  @Expose()
  @Type(() => ItemGroupDto)
  parent: ItemGroupDto;
}
