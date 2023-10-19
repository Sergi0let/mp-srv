import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { AdminService } from './admin.service';
// import JwtService from '@services/jwt/jwt.service';

@Controller('admins')
export class AdminController {
  constructor(
    private adminService: AdminService, // private jwtService: JwtService,8
  ) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getAllAdmins() {
    try {
      const admins = await this.adminService.getAllAdmins();
      return { status: 'ok', data: admins };
    } catch (err) {
      throw new HttpException(
        {
          status: 'error',
          message: `Error occurred while fetching admin data: ${err.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
