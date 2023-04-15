import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Req,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  UseGuards,
  BadRequestException,
  Delete,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { RegisterDto } from './dto/register.dto';
import { TokenAuthGuard } from '../auth/token-auth.guard';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(ValidationPipe)
  async registerUser(@Body() body: RegisterDto) {
    const existUser = await this.userRepository.findOne({
      where: { email: body.email },
    });

    if (existUser) {
      throw new BadRequestException('This email is already registered');
    }

    const user = this.userRepository.create(body);
    await user.generateToken();
    return this.userRepository.save(user);
  }

  @Post('sessions')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard('local'))
  async login(@Req() req: Request) {
    return req.user as User;
  }

  @Delete('sessions')
  @UseGuards(TokenAuthGuard)
  async logout(@Req() req: Request) {
    const user = req.user as User;
    await user.generateToken();
    await this.userRepository.save(user);
    return { message: 'Logout success' };
  }
}
