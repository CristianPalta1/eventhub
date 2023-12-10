import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategorieDto } from 'src/dto/categories/create-categorie.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categorieService: CategoriesService) {}

  @Get()
  getAllCategorie() {
    return this.categorieService.findAll();
  }

  @Post(':id')
  getOneCategorie(@Param('id') id: string) {
    return this.categorieService.findOneCategorie(id);
  }

  @Post()
  createCategorie(@Body() body: CreateCategorieDto) {
    return this.categorieService.createCategorie(body);
  }

  @Delete(':id')
  deleteCategorie(@Param('id') id: string) {
    return this.categorieService.deleteCategorie(id);
  }

  @Put(':id')
  updateCategorie(@Param('id') id: string, @Body() body: any) {
    return this.categorieService.updateCategorie(id, body);
  }
}
