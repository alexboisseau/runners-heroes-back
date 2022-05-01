import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException } from '@nestjs/common';
import { RunsService } from './runs.service';
import { CreateRunDto } from './dto/create-run.dto';
import { UpdateRunDto } from './dto/update-run.dto';
import { JwtAuthGuard } from 'src/technical/auth/guards/jwt-auth.guard';
import RunsPipe from './pipes/runs.pipe';
import { UserId } from 'src/users/decorators/user-id.decorator';
import UserIsTheOwner from './guards/user-is-the-owner.guard';

@Controller('runs')
@UseGuards(JwtAuthGuard)
export class RunsController {
  constructor(private readonly runsService: RunsService) {}

  @Post()
  async create(@Body(new RunsPipe()) createRunDto: CreateRunDto, @UserId() userId: string) {
    createRunDto.userId = userId;

    try {
      return await this.runsService.create(createRunDto);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.runsService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(UserIsTheOwner)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.runsService.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(UserIsTheOwner)
  @Patch(':id')
  async update(@Param('id') id: string, @Body(new RunsPipe()) updateRunDto: UpdateRunDto) {
    try {
      return await this.runsService.update(id, updateRunDto);
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Run to update not found');
      } else {
        throw error;
      }
    }
  }

  @UseGuards(UserIsTheOwner)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.runsService.remove(id);
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Run to delete not found');
      } else {
        throw error;
      }
    }
  }
}
