import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { User } from './user.model';

@Injectable()
export class UsersService {
  private users: User[] = [];
  userList() {
    return this.users;
  }

  addUser(name: string) {
    const user: User = {
      id: randomUUID(),
      name: name,
    };
    this.users.push(user);
    return user;
  }
}
