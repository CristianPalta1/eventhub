import { IsOptional, IsString } from 'class-validator';

export class UpdateCategorieDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
