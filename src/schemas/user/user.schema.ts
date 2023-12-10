import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { hash } from 'bcrypt';
@Schema({
  timestamps: true,
})
export class UserEntity {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true })
  email: string;

  @Prop({ required: true, trim: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);

UserSchema.pre('save', async function (next) {
  this.password = await hash(this.password, 10);
  next();
});
