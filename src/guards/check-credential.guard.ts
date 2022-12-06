import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from '../modules/super-admin/infrastructure/users.repository';
import bcrypt from 'bcrypt';
import { UserDBModel } from '../modules/super-admin/infrastructure/entity/userDB.model';

@Injectable()
export class CheckCredentialGuard implements CanActivate {
  constructor(protected usersRepository: UsersRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const user: UserDBModel | null =
      await this.usersRepository.getUserByIdOrLoginOrEmail(
        req.body.loginOrEmail,
      );

    if (!user) {
      throw new UnauthorizedException();
    }

    const passwordEqual = await bcrypt.compare(
      req.body.password,
      user.passwordHash,
    );

    if (!passwordEqual) {
      throw new UnauthorizedException();
    }

    req.user = user;
    return true;
  }
}
