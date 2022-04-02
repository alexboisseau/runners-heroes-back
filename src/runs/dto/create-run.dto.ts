import { RunType, WeatherType } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRunDto {
  @ApiProperty({
    description: 'Run duration in second',
    nullable: false,
  })
  duration: number;

  @ApiProperty({
    description: 'Total meters run by the user',
    nullable: false,
  })
  meters: number;

  @ApiPropertyOptional()
  @ApiProperty({
    description: 'Total kilocalories burn by the user',
    nullable: true,
  })
  kilocalories?: number;

  @ApiPropertyOptional()
  @ApiProperty({
    description: 'A description of the run, can be whatever user wants',
    nullable: true,
  })
  description?: string;

  @ApiPropertyOptional()
  @ApiProperty({
    description: 'Run location, can be a city or whatever user wants',
    nullable: true,
  })
  location?: string;

  @ApiProperty({
    description: 'Run type : OUT / IN',
    nullable: false,
    enum: ['OUT', 'IN'],
  })
  type: RunType;

  @ApiProperty({
    description: 'Timestamp of the run date',
    nullable: false,
  })
  startedDate: string;

  @ApiProperty({
    description: 'WeatherType : SUNY / SUN_AND_CLOUD / CLOUNDY / RAINY',
    nullable: false,
    enum: ['SUNY', 'SUN_AND_CLOUD', 'CLOUDY', 'RAINY'],
  })
  weather: WeatherType;

  userId: string;
}
