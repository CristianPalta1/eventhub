import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class CreateCategorieDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
