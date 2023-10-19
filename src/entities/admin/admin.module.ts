import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RequestsLoggerMiddleware } from '@helpers/reque stsLogger.middleware';
import { Admin } from './admin.entity';
import { JwtModule } from '@services/jwt/jwt.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [TypeOrmModule.forFeature([Admin]), JwtModule],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestsLoggerMiddleware).forRoutes(AdminController);
  }
}
