import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ulid } from 'ulid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);

    user.user_id = ulid();

    await this.usersRepository.save(user);

    return user;
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: string) {
    return await this.usersRepository.findOneBy({ user_id: id });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User was not found', {
        description: `User with id ${id} was not found`,
      });
    }

    //Same sintax as Object.assign(user, updateUserDto as User) but using generics.
    Object.assign(user, <User>updateUserDto);

    await this.usersRepository.save(user);
  }

  async remove(id: string) {
    await this.usersRepository.delete({ user_id: id });
  }
}
