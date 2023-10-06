import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  Res,
  UseInterceptors,
  ParseIntPipe,
  Body,
  HttpCode,
  HostParam,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.sevice';
import { UpdateUserDto } from './dto/update.user.dto';

@Controller({ path: 'users', host: ':account.test.com' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  // GET /users/
  @Get('/')
  @HttpCode(200)
  async getAllUsers(
    @HostParam('account') account: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log(account);
    const users = await this.userService.getAllUsers();
    return { status: 'ok', body: [users] };
  }

  // GET /users/:id
  @Get('/:id')
  async getUser(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const userData = this.userService.getUserData(id);
    // delete userData.password;
    return res.send({ status: 'ok', data: userData });
  }

  // POST /users/
  @Post('/')
  @UseInterceptors(FileInterceptor(''))
  async createUser(@Req() req: Request, @Res() res: Response) {
    await this.userService.createUser(req.body);
    return res.send({ status: 'ok' });
  }

  // PUT /users/:id
  @Put('/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
    @Res() res: Response,
  ) {
    await this.userService.updateUserData(id, body);
    return res.send({ status: 'ok' });
  }

  // PATCH /users/:id
  @Patch('/:id')
  async updateUserField(@Req() req: Request, @Res() res: Response) {}

  // DELETE /users/:id
  @Delete('/:id')
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    await this.userService.deleteUser(id);
    return res.send({ status: 'ok' });
  }
}
