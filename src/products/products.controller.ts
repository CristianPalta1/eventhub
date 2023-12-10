import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from 'src/dto/products/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get()
  getAllProducts() {
    return this.productService.findAll();
  }

  @Post(':id')
  getOneProduct(@Param('id') id: string) {
    return this.productService.findOneProduct(id);
  }

  @Post()
  createProduct(@Body() body: CreateProductDto) {
    return this.productService.createProduct(body);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() body: any) {
    return this.productService.updateProduct(id, body);
  }
}
