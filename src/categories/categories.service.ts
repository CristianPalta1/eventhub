import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CategorieEntity } from 'src/schemas/categorie/categorie.schema';
import { Model } from 'mongoose';
import { CreateCategorieDto } from './../dto/categories/create-categorie.dto';
import { UpdateCategorieDto } from './../dto/categories/update-categorie.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(CategorieEntity.name)
    private categorieModel: Model<CategorieEntity>,
  ) {}

  findAll() {
    return this.categorieModel.find();
  }

  async createCategorie(categorie: CreateCategorieDto) {
    const categorieInfo = await this.categorieModel.findOne({
      name: categorie.name,
    });
    if (categorieInfo) {
      throw new HttpException(
        'Categorie is already exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const newCategorie = new this.categorieModel(categorie);
    return newCategorie.save();
  }

  async findOneCategorie(id: string) {
    return this.categorieModel.findById(id);
  }

  async deleteCategorie(id: string) {
    return this.categorieModel.findByIdAndDelete(id);
  }

  async updateCategorie(id: string, categorie: UpdateCategorieDto) {
    return this.categorieModel.findByIdAndUpdate(id, categorie);
  }
}
