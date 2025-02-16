import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDTO } from './dtos/sign-in.dto';
import { UsersRepository } from '@modules/users/users.repository';
import { BadRequestError, UnauthorizedError } from '@common/errors/app-error';
import { ERRORS } from '@common/constants/errors';
import { SignUpDTO } from './dtos/sign-up.dto';
import { PasswordService } from '@common/password/password.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
    private readonly passwordService: PasswordService,
  ) {}

  async signIn(signInDto: SignInDTO): Promise<{ token: string }> {
    try {
      const user = await this.usersRepository.findByEmail(signInDto.email);

      const isTheSamePassword = await this.passwordService.comparePassword(
        signInDto.password,
        user.password,
      );

      if (!user || !isTheSamePassword) {
        throw new UnauthorizedError(ERRORS.AUTH.INVALID_AUTHENTICATION);
      }

      const payload = { sub: user.id, email: user.email };
      return {
        token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw new UnauthorizedError(ERRORS.AUTH.INVALID_AUTHENTICATION);
    }
  }

  async signUp(signUpDto: SignUpDTO): Promise<void> {
    if (signUpDto.password !== signUpDto.confirmPassword) {
      throw new BadRequestError(ERRORS.USERS.PASSWORDS_DO_NOT_MATCH);
    }
    const { confirmPassword, ...createUserDTO } = signUpDto;
    return await this.usersService.create(createUserDTO);
  }
}
