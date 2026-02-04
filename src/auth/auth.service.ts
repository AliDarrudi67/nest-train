import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { instanceToPlain } from 'class-transformer';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}
  async register(registerDto: RegisterDto) {
    const user = await this.userService.findUserByEmail(registerDto.email);
    if (user) {
      throw new HttpException('User already exist', 400);
    }
    registerDto.password = await bcrypt.hash(registerDto.password, 10);
    const savedUser = await this.userService.addUser(registerDto);
    return instanceToPlain(savedUser);
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findUserByEmail(loginDto.email);
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    const isPasswordMatch = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordMatch) {
      throw new HttpException('Wrong Password', 400);
    }
    const accessToken = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });

    return {
      accessToken,
    };
  }
}
