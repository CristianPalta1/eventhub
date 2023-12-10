import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersService } from 'src/users/users.service';

@ValidatorConstraint({ name: 'UserExistConstraint', async: true })
@Injectable()
export class UserExistConstraint implements ValidatorConstraintInterface {
  constructor(private readonly userService: UsersService) {}

  async validate(email: string) {
    const user = await this.userService.findOneUserByEmail(email);
    return !user;
  }

  defaultMessage() {
    return 'El correo $value ya está en uso.';
  }
}
