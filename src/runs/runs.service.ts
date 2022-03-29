import { Injectable } from '@nestjs/common';
import { Run } from '@prisma/client';
import { PrismaService } from 'src/technical/prisma/prisma.service';
import { CreateRunDto } from './dto/create-run.dto';
import { UpdateRunDto } from './dto/update-run.dto';

@Injectable()
export class RunsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createRunDto: CreateRunDto): Promise<Run> {
    return await this.prismaService.run.create({
      data: {
        ...createRunDto,
      },
    });
  }

  async findAll(): Promise<Run[]> {
    return await this.prismaService.run.findMany();
  }

  async findOne(id: string) {
    return await this.prismaService.run.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateRunDto: UpdateRunDto): Promise<Run> {
    return await this.prismaService.run.update({
      where: {
        id,
      },
      data: {
        ...updateRunDto,
      },
    });
  }

  async remove(id: string): Promise<Run> {
    return await this.prismaService.run.delete({
      where: {
        id,
      },
    });
  }
}
