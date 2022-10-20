import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return await this.prisma.user.create({ data: createUserDto });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.user.findUnique({ where: { id: id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({
      where: { id: id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.user.delete({ where: { id: id } });
  }

  async checkUserExists(id: number) {
    const user = await this.findOne(id);
    console.log(user);

    if (!user) return false;
    return true;
  }

  async checkEmailExists(email: string) {
    const user = await this.prisma.user.findFirst({ where: { email: email } });
    console.log(user);

    if (!user) return false;
    return true;
  }
}
