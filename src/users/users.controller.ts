import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { GetUserDTO } from './dto/get-users.dto';
import * as userModel from './user.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  userList(@Query() getUserDto: GetUserDTO): userModel.User[] {
    if (Object.keys(getUserDto).length)
      return this.userService.find(getUserDto);
    return this.userService.userList();
  }

  @Get('/:id')
  findUser(@Param('id') id: string): userModel.User {
    const user = this.userService.findUser(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  @Post()
  addUser(@Body() createUserDTO: CreateUserDTO): userModel.User {
    return this.userService.addUser(createUserDTO);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    this.userService.deleteUser(id);
  }

  @Patch('/:id')
  updateUser(
    @Param('id') id: string,
    @Body('name') name: string,
  ): userModel.User {
    return this.userService.updateUser(id, name);
  }
}
