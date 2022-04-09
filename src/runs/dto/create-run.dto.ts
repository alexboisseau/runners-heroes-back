import { RunType, WeatherType } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateRunDto {
  @ApiProperty({
    description: 'Run duration in second',
    nullable: false,
  })
  @IsInt()
  duration: number;

  @ApiProperty({
    description: 'Total meters run by the user',
    nullable: false,
  })
  @IsInt()
  meters: number;

  @ApiPropertyOptional()
  @ApiProperty({
    description: 'Total kilocalories burn by the user',
    nullable: true,
  })
  @IsInt()
  @IsOptional()
  kilocalories?: number;

  @ApiPropertyOptional()
  @ApiProperty({
    description: 'A description of the run, can be whatever user wants',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @ApiProperty({
    description: 'Run location, can be a city or whatever user wants',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({
    description: 'Run type : OUT / IN',
    nullable: false,
    enum: ['OUT', 'IN'],
  })
  @IsEnum(RunType)
  type: RunType;

  @ApiProperty({
    description: 'Timestamp of the run date',
    nullable: false,
  })
  @IsString()
  startedDate: string;

  @ApiProperty({
    description: 'WeatherType : SUNY / SUN_AND_CLOUD / CLOUNDY / RAINY',
    nullable: false,
    enum: ['SUNY', 'SUN_AND_CLOUD', 'CLOUDY', 'RAINY'],
  })
  @IsEnum(WeatherType)
  weather: WeatherType;

  userId: string;
}
