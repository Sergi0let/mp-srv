import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { genSalt, hash } from 'bcrypt';

import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  public async getAllProducts() {
    return this.productRepository.find();
  }

  public async getProductData(id: number) {
    return this.productRepository.findOne({ where: { id } });
  }

  public async createProduct(productData: any) {
    const newProduct = this.productRepository.create({ ...productData });
    return await this.productRepository.save(newProduct);
  }

  public async updateProductData(id: number, body: any) {
    return this.productRepository.update({ id }, body);
  }

  public async deleteProduct(id: number) {
    return await this.productRepository.delete(id);
  }
}
