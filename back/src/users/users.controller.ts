import { Controller, NotFoundException, Post, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Controller('users')
export class UsersController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @Post('register')
  async registerUser(@Req() req) {
    const existingUser = await this.userRepository.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (existingUser) {
      throw new NotFoundException(
        `User with email ${req.body.email} already exists`,
      );
    }
    const user = this.userRepository.create({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      country: req.body.country,
      password: req.body.password,
      avatar: req.body.avatar,
    });
    await user.generateToken();
    const errors = await validate(user);

    if (errors.length > 0) {
      return errors.map((error) => {
        return {
          value: error.value,
          property: error.property,
          message: Object.values(error.constraints)[0],
        };
      });
    } else {
      await this.userRepository.save(user);
    }
    return plainToClass(User, user);
  }
}
