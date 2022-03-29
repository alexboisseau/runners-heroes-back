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

  findAll() {
    return `This action returns all runs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} run`;
  }

  update(id: number, updateRunDto: UpdateRunDto) {
    return `This action updates a #${id} run`;
  }

  remove(id: number) {
    return `This action removes a #${id} run`;
  }
}
