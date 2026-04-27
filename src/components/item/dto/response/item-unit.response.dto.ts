import { BaseResponseDto } from '@app/core/dto/base-response.dto';
import { Expose } from 'class-transformer';
import { ItemUnitStatusEnum } from '../../item.constant';

export class ItemUnitDto extends BaseResponseDto {
  @Expose()
  isPieceUnit: boolean;

  @Expose()
  status: ItemUnitStatusEnum;

  @Expose()
  createdBy: BaseResponseDto;
}
