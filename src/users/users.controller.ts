import { Body, Controller, Get, Post } from '@nestjs/common';
import * as userModel from './user.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  userList() {
    return this.userService.userList();
  }

  @Post()
  addUser(@Body('name') name): userModel.User {
    return this.userService.addUser(name);
  }
}
