import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';

@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueUserEmailConstraint implements ValidatorConstraintInterface {
  constructor(private readonly userRepository: Repository<User>) {}

  async validate(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    return !user;
  }

  defaultMessage(): string {
    return 'This email is already registered';
  }
}

export function UniqueUserEmail(validationOptions?: ValidationOptions) {
  return function (
    object: { constructor: CallableFunction },
    propertyName: string,
  ) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UniqueUserEmailConstraint,
    });
  };
}
