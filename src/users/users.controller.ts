import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  Request,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserResponseType } from 'src/types/userReponse.type';
import { ExpressRequest } from 'src/middleware/auth.middleware';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getAllUser() {
    return this.userService.findAll();
  }

  @Get(':id')
  getOneUser(@Param('id') id: string) {
    return this.userService.findOneUser(id);
  }

  @Get('/auth')
  async currentUser(
    @Request() request: ExpressRequest,
  ): Promise<UserResponseType> {
    console.log(request);
    if (!request.user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.userService.buildUserResponse(request.user);
  }

  @Post(':email')
  getOneUserByEmail(@Param('email') email: string) {
    return this.userService.findOneUserByEmail(email);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() body: any) {
    return this.userService.updateUser(id, body);
  }
}
