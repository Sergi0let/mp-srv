import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
// import { Request, Response } from 'express';

// import { FileInterceptor } from '@nestjs/platform-express';
import { ProductService } from './product.sevice';

@Controller({ path: 'products' })
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // GET /products/
  @Get('/')
  @HttpCode(200)
  async getAllProducts() {
    const products = await this.productService.getAllProducts();
    return { status: 'ok', data: products };
  }

  // GET /products/:id
  @Get('/:id')
  @HttpCode(200)
  async getProduct(@Param('id', ParseIntPipe) id: number) {
    const productData = await this.productService.getProductData(id);
    return { status: 'ok', data: productData };
  }

  // POST /products/
  @Post('/')
  @HttpCode(201)
  async createProduct(@Body() body: any) {
    await this.productService.createProduct(body);
    return { status: 'ok' };
  }

  // PUT /product/:id
  @Put('/:id')
  @HttpCode(200)
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
  ) {
    this.productService.updateProductData(id, body);
    return { status: 'ok' };
  }

  // DELETE /product/:id
  @Delete('/:id')
  @HttpCode(200)
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    this.productService.deleteProduct(id);
    return { status: 'ok' };
  }
}
