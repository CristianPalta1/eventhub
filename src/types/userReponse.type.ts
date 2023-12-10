import { UserEntity } from 'src/schemas/user/user.schema';

export type UserResponseType = Omit<UserEntity, 'password'> & { token: string };
