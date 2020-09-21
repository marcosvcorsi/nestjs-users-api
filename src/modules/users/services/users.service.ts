import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { User } from '../entities/user';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find();

    return users;
  }

  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOneOrFail(id);

    return user;
  }

  create(createUserDTO: CreateUserDTO) {
    const user = this.usersRepository.create(createUserDTO);

    return this.usersRepository.save(user);
  }

  async update(id: number, updateUserDTO: UpdateUserDTO) {
    const user = await this.usersRepository.findOneOrFail(id);

    const userToUpdate = { ...user, ...updateUserDTO };

    await this.usersRepository.save(userToUpdate);
  }

  async delete(id: number) {
    await this.usersRepository.findOneOrFail(id);

    await this.usersRepository.delete(id);
  }
}
