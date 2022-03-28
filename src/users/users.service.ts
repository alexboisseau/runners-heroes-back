import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { InputSignupDto } from 'src/technical/auth/dto/signup.dto';
import { PrismaService } from 'src/technical/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(email: string): Promise<User> {
    return await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async createOne(data: InputSignupDto): Promise<User> {
    return await this.prismaService.user.create({
      data: {
        ...data,
      },
    });
  }
}
