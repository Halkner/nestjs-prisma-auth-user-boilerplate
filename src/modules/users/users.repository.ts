import { Injectable } from '@nestjs/common';
import { PrismaService } from '@common/prisma/prisma.service';
import { buildOrWhereFilter } from '@common/utils/prisma-filters.util';
import { ORDER_FIELDS } from '@common/constants/order-fields';
import { CreateUserDTO } from '@modules/users/dtos/create-user.dto';
import { User } from '@prisma/client';
import { SEARCHABLE_FIELDS } from '@common/constants/searchable-fields';
import { UserResponseDto } from './dtos/user-response.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: CreateUserDTO): Promise<void> {
    await this.prisma.user.create({ data: user });
  }

  async findById(id: string): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: { id },
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: { username },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: { email },
    });
  }

  async list(
    search?: string,
    orderBy?: {
      field: keyof typeof ORDER_FIELDS.user;
      direction: 'asc' | 'desc';
    },
    page?: number,
    limit?: number,
  ): Promise<{ data: UserResponseDto[]; total: number }> {
    const skip = page && limit ? (page - 1) * limit : undefined;
    const take = limit;

    const filters: Record<string, any> = {};

    if (search) {
      SEARCHABLE_FIELDS.user.forEach((field) => {
        filters[field] = search;
      });
    }

    const where = buildOrWhereFilter(filters);

    const [data, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        orderBy: orderBy
          ? { [ORDER_FIELDS.user[orderBy.field]]: orderBy.direction }
          : undefined,
        skip,
        take,
        omit: {
          password: true,
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    return { data, total };
  }

  async update(user: User): Promise<void> {
    await this.prisma.user.update({
      data: user,
      where: { id: user.id },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
