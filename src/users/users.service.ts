import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateUserDTO } from './dto/create-user.dto';
import { GetUserDTO } from './dto/get-users.dto';
import { User } from './user.model';

@Injectable()
export class UsersService {
  private users: User[] = [];
  userList(): User[] {
    return this.users;
  }

  find(getUserDto: GetUserDTO): User[] {
    let users = this.userList();
    const { name, email } = getUserDto;
    if (name) users = users.filter((item) => item.name == getUserDto.name);
    else if (email)
      users = users.filter((item) => item.email == getUserDto.email);
    if (!users) {
      throw new NotFoundException(`users not found`);
    }

    return users;
  }

  addUser(createUserDTO: CreateUserDTO) {
    const { name, email } = createUserDTO;
    const user: User = {
      id: randomUUID(),
      name,
      email,
    };
    this.users.push(user);
    return user;
  }

  findUser(userId: string) {
    return this.users.find((item) => item.id == userId);
  }

  deleteUser(id: string) {
    const index = this.users.findIndex((item) => item.id == id);
    this.users.splice(index, 1);
  }

  updateUser(id: string, name: string): User {
    let user = this.findUser(id);
    if (user) user.name = name;
    if (!user) {
      throw new NotFoundException(`user not found`);
    }
    return user;
  }
}
