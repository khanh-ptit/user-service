import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class GetInternalItemRequest {
  @IsString({ each: true })
  @IsOptional()
  selectFields?: string[];

  @IsString({ each: true })
  @IsOptional()
  codes?: string[];

  @IsInt({ each: true })
  @IsArray()
  @IsOptional()
  ids?: number[];
}
