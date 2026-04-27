import { IsNotEmpty, IsOptional } from 'class-validator';
import { BaseDto } from './base.dto';

export class FileAbstractDto {
  filename: string;
  data: ArrayBuffer;
  encoding: string;
  mimetype: string;
  limit: boolean;
  buffer: Buffer;
}

export class FileUploadRequestDto extends BaseDto {
  @IsNotEmpty()
  file: FileAbstractDto[];

  @IsNotEmpty()
  @IsOptional()
  userIdCreated?: number;
}
