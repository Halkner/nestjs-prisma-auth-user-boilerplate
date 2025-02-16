import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { ERRORS } from '@common/constants/errors';
import { User } from '@prisma/client';
import { ORDER_FIELDS } from '@common/constants/order-fields';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { assignIn } from '@common/utils/assign-in';
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from '@common/errors/app-error';
import { UsersRepository } from './users.repository';
import { PasswordService } from '@common/password/password.service';
import { ListUsersResponseDTO } from './dtos/list-users-response.dto';
import { UserResponseDto } from './dtos/user-response.dto';
import { plainToInstance } from 'class-transformer';
@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly passwordService: PasswordService,
  ) {}

  async create(createUserDto: CreateUserDTO): Promise<void> {
    const emailAlreadyExists = await this.usersRepository.findByEmail(
      createUserDto.email,
    );
    if (emailAlreadyExists) {
      throw new ConflictError(ERRORS.USERS.EMAIL_ALREADY_EXISTS);
    }

    createUserDto.password = await this.passwordService.hashPassword(
      createUserDto.password,
    );

    await this.usersRepository.create(createUserDto);
  }

  async list(
    search?: string,
    orderBy?: {
      field: keyof typeof ORDER_FIELDS.user;
      direction: 'asc' | 'desc';
    },
    page?: number,
    limit?: number,
  ): Promise<ListUsersResponseDTO> {
    const { data, total } = await this.usersRepository.list(
      search,
      orderBy,
      page,
      limit,
    );

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async findById(id: string): Promise<{ data: UserResponseDto | null }> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundError(ERRORS.USERS.ID_NOT_FOUND);
    }

    const userWithoutPassword = plainToInstance(UserResponseDto, user);

    return { data: userWithoutPassword };
  }

  async findByEmail(email: string): Promise<{ data: User | null }> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundError(ERRORS.USERS.ID_NOT_FOUND);
    }

    return { data: user };
  }

  async update(id: string, updateUserDTO: UpdateUserDTO) {
    if (updateUserDTO.password !== updateUserDTO.confirmPassword) {
      throw new BadRequestError(ERRORS.USERS.PASSWORDS_DO_NOT_MATCH);
    }
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundError(ERRORS.USERS.ID_NOT_FOUND);
    }

    if (updateUserDTO.email !== user.email) {
      const emailAlreadyExists = await this.usersRepository.findByEmail(
        updateUserDTO.email,
      );
      if (emailAlreadyExists) {
        throw new ConflictError(ERRORS.USERS.EMAIL_ALREADY_EXISTS);
      }
    }

    const hashedPassword = await this.passwordService.hashPassword(
      updateUserDTO.password,
    );

    assignIn(user, {
      username: updateUserDTO.username,
      email: updateUserDTO.email,
      password: hashedPassword,
      updated_at: new Date(),
    });

    await this.usersRepository.update(user);
  }

  async delete(id: string): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundError(ERRORS.USERS.ID_NOT_FOUND);
    }
    await this.usersRepository.delete(id);
  }
}
