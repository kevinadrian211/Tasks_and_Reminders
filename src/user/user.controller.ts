import { Controller, Get, Post, Body, Param, Put, Patch, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') userId: string) {
    return this.userService.getUserById(+userId);
  }

  @Put(':id')
  updateUser(@Param('id') userId: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(+userId, updateUserDto);
  }

  @Patch(':id')
  patchUser(@Param('id') userId: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.patchUser(+userId, updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') userId: string) {
    return this.userService.deleteUser(+userId);
  }
}
