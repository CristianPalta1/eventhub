import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserEntity } from 'src/schemas/user/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './../dto/users/create-users.dto';
import { UpdateUserDto } from './../dto/users/update-users.dto';
import { UserResponseType } from 'src/types/userReponse.type';
import { LoginUserDto } from 'src/dto/users/login-user.dto';
import { compare } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserEntity.name) private userModel: Model<UserEntity>,
  ) {}

  findAll() {
    return this.userModel.find();
  }

  async createUser(user: CreateUserDto) {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  buildUserResponse(user: UserEntity): UserResponseType {
    return {
      name: user.name,
      email: user.email,
      token: this.generateJwt(user),
    };
  }

  generateJwt(user: UserEntity): string {
    return '1234';
  }

  async loginUser(loginDto: LoginUserDto) {
    const user = await this.userModel
      .findOne({ email: loginDto.email })
      .select('+password');

    if (!user) {
      throw new HttpException(
        'User not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isPasswordMatch = await compare(loginDto.password, user.password);

    if (!isPasswordMatch) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async findOneUser(id: string) {
    return this.userModel.findById(id);
  }

  async findOneUserByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }

  async updateUser(id: string, user: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, user);
  }
}
