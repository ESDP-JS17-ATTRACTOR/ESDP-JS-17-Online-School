import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';
import { ModuleRef } from '@nestjs/core';

@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueUserEmailConstraint implements ValidatorConstraintInterface {
  constructor(private readonly usersService: UsersService) {}

  async validate(email: string): Promise<boolean> {
    const user = await this.usersService.findByEmail(email);
    return !user;
  }

  defaultMessage(): string {
    return 'This email is already registered';
  }
}

export function UniqueUserEmail(validationOptions?: ValidationOptions) {
  return function (
    object: {
      constructor: CallableFunction;
      context?: { userModuleRef: ModuleRef };
    },
    propertyName: string,
  ) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: async (email: string) =>
        await new UniqueUserEmailConstraint(
          object.context.userModuleRef.get(UsersService),
        ).validate(email),
    });
  };
}
