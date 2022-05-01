import { BadRequestException, Injectable } from '@nestjs/common';
import { Run } from '@prisma/client';
import { PrismaService } from 'src/technical/prisma/prisma.service';
import { CreateRunDto } from './dto/create-run.dto';
import { UpdateRunDto } from './dto/update-run.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class RunsService {
  /** BUSINESS RULES
   *    - A run can't have the property startedDate in the future
   *    - The maximum meters run by a user for a day is 200 000 (200km)
   */

  private readonly maxMetersRunByAUserForADay = 200000;

  constructor(private readonly prismaService: PrismaService) {}

  /* Publics methods */
  async create(createRunDto: CreateRunDto): Promise<Run> {
    const { startedDate } = createRunDto;

    if (this.runIsInTheFuture(startedDate)) {
      throw new BadRequestException("Run started date can't be in the future.");
    }

    if (!this.userCanAddMoreMetersForARunDay(createRunDto.userId, startedDate)) {
      throw new BadRequestException('Maximum meters run by a user for a day is 200 000.');
    }

    return await this.prismaService.run.create({
      data: {
        ...createRunDto,
        startedDate, // In Prisma Schema, startedDate has DateTime type, however, in the Dto, he has string type (for timestamp). So we pass a property with the same fieldName (startedDate) which has a DateTime type
      },
    });
  }

  async findAll(): Promise<Run[]> {
    return await this.prismaService.run.findMany();
  }

  async findOne(id: string): Promise<Run> {
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

  async userIsTheOwner(id: string, userId: string): Promise<boolean> {
    const run = await this.prismaService.run.findUnique({ where: { id } });

    return run && run.userId === userId ? true : false;
  }

  /* Privates methods */

  private async findMetersRunByAUser(userId: string, minDate?: Date, maxDate?: Date): Promise<number> {
    const runWhereInput: Prisma.RunWhereInput = {
      userId,
      ...(minDate &&
        maxDate && {
          startedDate: {
            gt: minDate,
            lte: maxDate,
          },
        }),
    };

    const {
      _sum: { meters },
    } = await this.prismaService.run.aggregate({
      _sum: {
        meters: true,
      },
      where: runWhereInput,
    });

    return meters;
  }

  private runIsInTheFuture(startedDate: Date): boolean {
    if (startedDate.getTime() > Date.now()) {
      return false;
    }
  }

  private async userCanAddMoreMetersForARunDay(userId: string, startedDate: Date): Promise<boolean> {
    const milisecondsInADay = 1000 * 3600 * 24;

    const minDate = new Date(
      Date.UTC(startedDate.getFullYear(), startedDate.getMonth(), startedDate.getDate(), 0, 0, 0),
    );
    const maxDate = new Date(minDate.getTime() + milisecondsInADay);

    const metersRunByUserForThisDay = await this.findMetersRunByAUser(userId, minDate, maxDate);

    return metersRunByUserForThisDay > this.maxMetersRunByAUserForADay ? false : true;
  }
}
