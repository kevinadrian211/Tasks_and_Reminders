import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    const createdUser = await this.prisma.user.create({
      data: createUserDto,
    });
    return createdUser;
  }

  async getAllUsers() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async getUserById(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return user;
  }

  async updateUser(userId: number, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: updateUserDto,
    });

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return updatedUser;
  }

  async patchUser(userId: number, updateUserDto: UpdateUserDto) {
    const patchedUser = await this.prisma.user.update({
      where: { id: userId },
      data: updateUserDto,
    });

    if (!patchedUser) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return patchedUser;
  }

  async deleteUser(userId: number) {
    const deletedUser = await this.prisma.user.delete({
      where: { id: userId },
    });

    if (!deletedUser) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return deletedUser;
  }
}
