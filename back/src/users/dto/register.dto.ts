import { IsEmail, IsNotEmpty } from 'class-validator';
import { UniqueUserEmail } from '../validators/uniqueUserEmail.validator';

export class RegisterDto {
  @IsEmail()
  @UniqueUserEmail()
  email: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  password: string;
}
