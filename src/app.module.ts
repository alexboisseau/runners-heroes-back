import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import AppConfig from 'config/env.config';

import { AuthModule } from './technical/auth/auth.module';
import { UsersModule } from './users/users.module';
import { RunsModule } from './runs/runs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [AppConfig],
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    RunsModule,
  ],
  providers: [],
})
export class AppModule {}
