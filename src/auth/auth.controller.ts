import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dto/users/create-users.dto';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from 'src/dto/users/login-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('register')
  async registerUser(@Body() body: CreateUserDto) {
    const user = await this.userService.createUser(body);
    return this.userService.buildUserResponse(user);
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async loginUser(@Body() loginDto: LoginUserDto) {
    return await this.authService.login(loginDto);
  }
}
