import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Users from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private user_repository: Repository<Users>,
  ) {}

  userList = async () => {
    const user = await this.user_repository.create({
      first_name: 'ali',
      last_name: 'darrudi',
      email: 'ali.daroudi@gmail.com',
      password: '12345678',
    });
    this.user_repository.save(user);
    return user;
    return await this.user_repository.find();
  };

  addUser = async () => {
    const user = await this.user_repository.create({
      first_name: 'ali',
      last_name: 'darrudi',
      email: 'ali.daroudi@gmail.com',
      password: '12345678',
    });
    this.user_repository.save(user);
    return user;
  };
}
