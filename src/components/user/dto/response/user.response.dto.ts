import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: 1, description: '' })
  @Expose()
  id: number;

  @ApiProperty({ example: 'abc@gmail.com', description: '' })
  @Expose()
  email: string;

  @ApiProperty({ example: 'abc', description: '' })
  @Expose()
  username: string;

  @ApiProperty({ example: 'abc', description: '' })
  @Expose()
  name: string;

  @ApiProperty({ example: '0987-1254-125', description: '' })
  @Expose()
  phone: string;

  @ApiProperty({ example: 1, description: '' })
  @Expose()
  status: number;

  @Expose()
  createdAt: string;

  @Expose()
  createdBy: number;

  @Expose()
  updatedAt: string;
}
