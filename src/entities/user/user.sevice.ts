import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { genSalt, hash } from 'bcrypt';

import { User } from './user.entity';
import { UpdateUserDto } from './dto/update.user.dto';
import { RegisterUserDto } from './dto/registerUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  availableFields = [
    'id',
    'email',
    'password',
    'nameFirst',
    'nameLast',
    'birthDate',
    'gender',
  ];

  // Filter body's fields from available fields list
  private filterFields(body: { [k: string]: any }) {
    const filterBody: { [k: string]: any } = {};
    Object.keys(body).filter((k) => {
      if (this.availableFields.includes(k)) {
        filterBody[k] = body[k];
      }
    });
    return filterBody;
  }

  // Registery new user
  public async createUser(userData: RegisterUserDto) {
    const salt = await genSalt(10);
    const hashPassword = await hash(userData.password, salt);
    const newUser = this.userRepository.create({
      ...userData,
      password: hashPassword,
    });
    await this.userRepository.save(newUser);
  }

  public async getUserByLoginOrEmail(loginOrEmail: string) {
    return await this.userRepository.findOne({
      where: [{ email: loginOrEmail }, { login: loginOrEmail }],
    });
  }

  // Get user data By Id
  public async getUserData(id: number) {
    return await this.userRepository.findOne({
      where: { id },
      // select: ['id', 'email', 'password', 'nameFirst', 'birthDate'], first variant
      select: this.availableFields as any,
    });
  }

  // Get all users
  public async getAllUsers() {
    return await this.userRepository.find({
      // select: ['id', 'email', 'nameFirst', 'birthDate'], first variant
      select: this.availableFields as any,
    });
  }

  // Update user data whole
  public async updateUserData(id: number, body: UpdateUserDto) {
    // const { nameFirst, nameLast, gender, email, birthDate } = body; first variant
    return await this.userRepository.update(
      { id },
      // { nameFirst, nameLast, gender, email, birthDate },  first variant
      this.filterFields(body),
    );
  }

  // Delete user by Id
  public async deleteUser(id: number) {
    return await this.userRepository.delete(id);
  }
}
