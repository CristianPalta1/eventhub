import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CategorieEntity,
  CategorieSchema,
} from '../schemas/categorie/categorie.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CategorieEntity.name, schema: CategorieSchema },
    ]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
