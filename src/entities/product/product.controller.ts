import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';

import { ProductService } from './product.sevice';

import { getMulterOptions, renameUploadedFile } from '@helpers/fileUploader';
import { PRODUCT_IMAGES_FOLDER_PATH } from '@const/storagePaths';

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
  @UseInterceptors(
    FileInterceptor('image', getMulterOptions('images/products')),
  )
  async createProduct(@Body() body: any, @UploadedFile() image: Multer.File) {
    const renamedFilename = renameUploadedFile(
      image.filename,
      PRODUCT_IMAGES_FOLDER_PATH,
    );
    await this.productService.createProduct({
      ...body,
      image: renamedFilename,
    });
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
