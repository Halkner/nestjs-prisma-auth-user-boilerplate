import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Query,
  Get,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ListUsersQueryDto } from './dtos/list-users-query.dto';
import {
  ApiUsersControllerDocs,
  ApiDeleteUserDocs,
  ApiFindByIDUserDocs,
  ApiListUsersDocs,
  ApiUpdateUserDocs,
} from './docs/users.docs';
import { UpdateUserDTO } from './dtos/update-user.dto';

@Controller('users')
@ApiUsersControllerDocs()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  @ApiListUsersDocs()
  async list(@Query() query: ListUsersQueryDto) {
    const { orderBy, direction, page, limit, search } = query;
    return this.usersService.list(
      search,
      orderBy && direction ? { field: orderBy, direction } : undefined,
      page,
      limit,
    );
  }

  @Get(':id')
  @ApiFindByIDUserDocs()
  async findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiUpdateUserDocs()
  async update(@Param('id') id: string, @Body() body: UpdateUserDTO) {
    return await this.usersService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiDeleteUserDocs()
  async delete(@Param('id') id: string) {
    return await this.usersService.delete(id);
  }
}
