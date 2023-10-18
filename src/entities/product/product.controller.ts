import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
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
  @HttpCode(HttpStatus.OK)
  async getAllProducts() {
    const products = await this.productService.getAllProducts();
    return { status: 'ok', data: products };
  }

  // GET /products/:id
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getProduct(@Param('id', ParseIntPipe) id: number) {
    const productData = await this.productService.getProductData(id);
    return { status: 'ok', data: productData };
  }

  // POST /products/
  @Post('/')
  @HttpCode(HttpStatus.OK)
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
  @HttpCode(HttpStatus.OK)
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
  ) {
    this.productService.updateProductData(id, body);
    return { status: 'ok' };
  }

  // DELETE /product/:id
  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    this.productService.deleteProduct(id);
    return { status: 'ok' };
  }
}
