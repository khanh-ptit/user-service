import { BaseDto } from '@app/core/dto/base.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserRequestDto extends BaseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  username: string;
}
