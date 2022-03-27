import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './technical/auth/auth.controller';
import { AuthModule } from './technical/auth/auth.module';
import { AuthService } from './technical/auth/auth.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
