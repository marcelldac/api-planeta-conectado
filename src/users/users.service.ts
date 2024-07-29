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

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneBy({ user_id: id });
    if (!user) {
      throw new NotFoundException('User was not found', {
        description: `User with id ${id} was not found`,
      });
    }

    Object.assign(user, updateUserDto as User);

    await this.usersRepository.save(user);
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
