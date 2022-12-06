import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { EmailConfirmationRepository } from '../modules/super-admin/infrastructure/emailConfirmation.repository';

@ValidatorConstraint({ name: 'ConfirmationCodeValid', async: true })
@Injectable()
export class ConfirmationCodeValidator implements ValidatorConstraintInterface {
  constructor(
    protected emailConfirmationRepository: EmailConfirmationRepository,
  ) {}

  async validate(code: string) {
    const emailConfirmation =
      await this.emailConfirmationRepository.getEmailConfirmationByCodeOrId(
        code,
      );

    if (!emailConfirmation) {
      return false;
    }

    if (emailConfirmation.isConfirmed === true) {
      return false;
    }

    if (emailConfirmation.expirationDate < new Date()) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Confirmation code is not valid';
  }
}
