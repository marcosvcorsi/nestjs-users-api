import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { UserDTO } from '../dto/user.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(): Promise<UserDTO[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<UserDTO> {
    return this.usersService.findById(id);
  }

  @Post()
  async create(@Body() user: CreateUserDTO) {
    await this.usersService.create(user);
  }

  @Put(':id')
  @HttpCode(204)
  async update(@Param('id') id: number, @Body() user: UpdateUserDTO) {
    await this.usersService.update(id, user);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.usersService.delete(id);
  }
}
