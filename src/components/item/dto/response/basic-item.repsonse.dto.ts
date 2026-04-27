import { BaseResponseDto } from '@app/core/dto/base-response.dto';
import { Expose } from 'class-transformer';
import { ItemActiveStatusEnum, ItemStatusEnum } from '../../item.constant';

class GeneralItemDto {
  @Expose()
  itemTypeId: BaseResponseDto;
}
export class BasicItemDto extends BaseResponseDto {
  @Expose()
  status: ItemStatusEnum;

  @Expose()
  activeStatus: ItemActiveStatusEnum;

  @Expose()
  general: GeneralItemDto;
}
