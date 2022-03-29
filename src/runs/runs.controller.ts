import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  NotFoundException,
} from '@nestjs/common';
import { RunsService } from './runs.service';
import { CreateRunDto } from './dto/create-run.dto';
import { UpdateRunDto } from './dto/update-run.dto';
import { JwtAuthGuard } from 'src/technical/auth/guards/jwt-auth.guard';

@Controller('runs')
@UseGuards(JwtAuthGuard)
export class RunsController {
  constructor(private readonly runsService: RunsService) {}

  @Post()
  async create(@Request() req, @Body() createRunDto: CreateRunDto) {
    const { userId } = req.user; // Injected from JwtStrategy
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

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.runsService.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRunDto: UpdateRunDto) {
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
