import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class ProductEntity {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true, trim: true })
  description: string;

  @Prop({ required: true, trim: true })
  image: string;

  @Prop({ required: true, trim: true })
  category: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ default: false })
  inInventary: number;
}

export const ProductSchema = SchemaFactory.createForClass(ProductEntity);
