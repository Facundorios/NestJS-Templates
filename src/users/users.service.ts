import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  //User Service is responsible for business logic and data access related to users.
  // It interacts with the User entity and performs CRUD operations on user data.
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  async findAll() {
    return await this.userRepository.find();
  }

  async findUserById(id: string) {
    return await this.userRepository.findOneBy({ id });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { email },
      relations: ['role'],
    });
  }

  async create(dto: CreateUserDto) {
    const { email } = dto;

    const existing = await this.findUserByEmail(email);
    if (existing) throw new ConflictException('Email already exists');

    const user = this.userRepository.create(dto);
    return await this.userRepository.save(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    return await this.userRepository.delete(id);
  }

  async assignRoleToUser(userId: string, roleId: string) {
    // const user = await this.userRepository.findOneBy({ id: userId });
    // if (!user) {
    //   throw new Error('User not found');
    // }
    // user.role.push(roleId);
    // return await this.userRepository.save(user);
  }
}
