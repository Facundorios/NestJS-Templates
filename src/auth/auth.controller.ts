import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() dto: RegisterUserDto) {
    return await this.authService.register(dto);
  }

  @Post('login')
  async loginUser(@Body() dto: LoginUserDto) {
    return await this.authService.login(dto);
  }
}
