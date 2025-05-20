import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { RegisterUserDto } from './dto/register-user.dto';

import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from './dto/login-user.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,

    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterUserDto) {
    const { name, email, password } = dto;

    const exists = await this.usersService.findUserByEmail(email);
    if (exists) throw new ConflictException('Email already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    // const defaultRole = await this.rolesService.findByName('user');

    const newUser = await this.usersService.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      // role: defaultRole,
    });

    return newUser;
  }

  async login(dto: LoginUserDto) {
    const { email, password } = dto;

    const exists = await this.usersService.findUserByEmail(email);
    if (!exists) throw new BadRequestException('Invalid credentials');

    const isMatch = await bcrypt.compare(password, exists.password);
    if (!isMatch) throw new UnauthorizedException();

    const token = this.jwtService.sign({
      id: exists.id,
      email: exists.email,
    });

    return {
      access_token: token,
      user: {
        id: exists.id,
        email: exists.email,
        // role: exists.role,
      },
    };
  }
}
