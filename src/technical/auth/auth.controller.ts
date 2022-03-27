import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller()
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('auth/signin')
  async signin(@Request() req) {
    return req;
  }

  @Post('auth/signup')
  async signup() {}
}
