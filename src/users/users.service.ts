import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/technical/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(email: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  }
}
