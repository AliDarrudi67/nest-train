import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import Users from 'src/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/Jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
