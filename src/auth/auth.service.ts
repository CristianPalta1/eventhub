import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserEntity } from 'src/schemas/user/user.schema';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from 'src/dto/users/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserEntity.name) private userModel: Model<UserEntity>,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneUserByEmail(email);
    console.log('userVal', user);
    console.log('email', email);
    console.log('password', password);
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    console.log('user', user);
    const payload = { username: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload, { secret: 'secret' }),
    };
  }
}
