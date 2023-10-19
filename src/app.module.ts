import { Module } from '@nestjs/common';

import { ConfigModule } from './config.module';
import { TypeOrmModule } from '@db/typeorm.module';
import { AdminModule } from '@db/admin/admin.module';
import { RoleModule } from '@db/role/role.module';
import { UserModule } from '@entities/user/user.module';
import { ProductModule } from '@entities/product/product.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule,

    AdminModule,
    RoleModule,
    UserModule,
    ProductModule,
  ],
})
export class AppModule {}
