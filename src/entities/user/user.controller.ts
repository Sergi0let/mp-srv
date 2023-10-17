import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Res,
  ParseIntPipe,
  Body,
  HttpCode,
  HostParam,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UserService } from './user.sevice';

import { UpdateUserDto } from './dto/update.user.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { RegisterUserDto } from './dto/registerUser.dto';

import { ForbiddenException } from '@helpers/exceptions';

@Controller({ path: 'users' })
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // GET /users/
  @Get('/')
  @HttpCode(200)
  async getAllUsers(@HostParam('account') account: string) {
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

  // POST /users/ - login in app
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginUserDto) {
    const { loginOrEmail, password } = body;

    const foundUser =
      await this.userService.getUserByLoginOrEmail(loginOrEmail);

    console.log('foundUser', foundUser);

    if (!foundUser) {
      throw new ForbiddenException();
    }

    const isPasswordMatch = await compare(password, foundUser.password);

    if (!isPasswordMatch) {
      throw new ForbiddenException();
    }

    const jwt = this.jwtService.sign({ x: 1 }, { secret: 'qwerty' });

    return { status: 'ok', data: { accessToken: jwt } };
  }

  // POST /users/register - register new User
  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: RegisterUserDto) {
    await this.userService.createUser(body);
    return { status: 'ok', data: null };
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
  async updateUserField() {}

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
