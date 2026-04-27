import { Expose } from 'class-transformer';

export class AuthUserReponseDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  username: string;

  @Expose()
  fullName: string;

  @Expose()
  companyId: number;

  @Expose()
  code: string;

  @Expose()
  phone: string;

  @Expose()
  status: number;

  @Expose()
  dateOfBirth: Date;

  @Expose()
  otpCode: string;

  @Expose()
  expire: Date;

  @Expose()
  costCenterIds: string[];

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose() deletedAt?: Date;
}
