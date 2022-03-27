import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthController {
  @UseGuards(AuthGuard('local'))
  @Post('auth/signin')
  async signin(@Request() req) {
    return req;
  }

  @Post('auth/signup')
  async signup() {}
}
