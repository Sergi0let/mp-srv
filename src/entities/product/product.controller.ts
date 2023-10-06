import { Controller, Get, HttpCode } from '@nestjs/common';
// import { Request, Response } from 'express';

// import { FileInterceptor } from '@nestjs/platform-express';
import { ProductService } from './product.sevice';

@Controller({ path: 'products' })
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // GET /users/
  @Get('/')
  @HttpCode(200)
  async getAllUsers() {
    return { status: 'ok' };
  }
}
