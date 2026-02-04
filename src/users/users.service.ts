import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from 'src/auth/dto/register.dto';
import Users from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private user_repository: Repository<Users>,
  ) {}

  userList = async () => {
    return await this.user_repository.find();
  };

  addUser = async (registerDto: RegisterDto) => {
    const user = this.user_repository.create(registerDto);
    // حتما await بزن
    const savedUser = await this.user_repository.save(user);
    return savedUser;
  };

  findUserByEmail = async (email: string) => {
    return await this.user_repository.findOne({ where: { email: email } });
  };
}
