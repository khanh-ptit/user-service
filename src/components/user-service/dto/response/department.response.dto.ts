import { Expose } from 'class-transformer';

export class DepartmentSettingResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  enName: string;

  @Expose()
  vnName: string;

  @Expose()
  jpName: string;

  @Expose()
  code: string;

  @Expose()
  status: number;

  @Expose()
  description: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
