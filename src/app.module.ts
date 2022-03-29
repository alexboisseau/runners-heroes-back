import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './technical/auth/auth.controller';
import { AuthModule } from './technical/auth/auth.module';
import { UsersModule } from './users/users.module';
import { RunsModule } from './runs/runs.module';

@Module({
  imports: [UsersModule, AuthModule, RunsModule],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
