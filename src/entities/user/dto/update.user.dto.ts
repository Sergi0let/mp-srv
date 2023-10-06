import {
  IsEmail,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { E_Gender } from '../types';

export class UpdateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(1)
  nameFirst: string;

  @IsString()
  @MinLength(2)
  nameLast: string;

  @IsISO8601()
  birthDate: Date;

  @IsNotEmpty()
  @IsEnum(E_Gender)
  gender: E_Gender;
}
