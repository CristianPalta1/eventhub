import { IsString, IsNotEmpty, Length, Validate } from 'class-validator';
import { UserExistConstraint } from 'src/auth/constraint/user-exist.constraint';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Validate(UserExistConstraint)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;
}
