import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/entities/user.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService, JwtModule],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: process.env.JWT_SECRET_KEY || 'secretKey',
          signOptions: {
            expiresIn: process.env.JWT_EXPIRES_IN || '60s',
          },
        };
      },
    }),
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    UsersModule,
  ],
})
export class AuthModule {}
