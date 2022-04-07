import { Module } from '@nestjs/common';
import { AuthController } from './technical/auth/auth.controller';
import { AuthModule } from './technical/auth/auth.module';
import { UsersModule } from './users/users.module';
import { RunsModule } from './runs/runs.module';

@Module({
  imports: [UsersModule, AuthModule, RunsModule],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}
