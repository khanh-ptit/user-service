import { Expose, Transform } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class BaseResponseDto {
  @Expose({ name: '_id' })
  @Transform((value) => {
    return value.obj?._id?.toString() || value.obj?.id;
  })
  id: any;

  @Expose()
  code: string;

  @Expose()
  name: string;

  @Expose()
  nameEn: string;

  @Expose()
  nameVn: string;

  @Expose()
  nameJp: string;
}

export class BaseNoSqlResponseDto {
  @Transform(({ obj }) => obj._id?.toString())
  @Expose()
  id: string;

  @Expose()
  code: string;

  @Expose()
  name: string;
}
