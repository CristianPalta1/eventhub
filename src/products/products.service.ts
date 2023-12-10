import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductEntity } from 'src/schemas/product/product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from '../dto/products/create-product.dto';
import { UpdateProductDto } from '../dto/products/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(ProductEntity.name) private productModel: Model<ProductEntity>,
  ) {}

  findAll() {
    return this.productModel.find();
  }

  async createProduct(product: CreateProductDto) {
    const productInfo = await this.productModel.findOne({ name: product.name });
    if (productInfo) {
      throw new HttpException(
        'Product is already exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const newProduct = new this.productModel(product);
    return newProduct.save();
  }

  async findOneProduct(id: string) {
    return this.productModel.findById(id);
  }

  async deleteProduct(id: string) {
    return this.productModel.findByIdAndDelete(id);
  }

  async updateProduct(id: string, product: UpdateProductDto) {
    return this.productModel.findByIdAndUpdate(id, product);
  }
}
