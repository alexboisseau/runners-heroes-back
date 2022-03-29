import { RunType, WeatherType } from '@prisma/client';

export class CreateRunDto {
  duration: number;
  meters: number;
  kilocalories?: number;
  description?: string;
  location?: string;
  type: RunType;
  startedDate: string;
  weather: WeatherType;
  userId: string;
}
