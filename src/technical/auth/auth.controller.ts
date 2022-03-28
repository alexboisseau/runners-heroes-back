import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import SignupDto from './dto/signup.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async signin(@Request() req) {
    return this.authService.generateJwtToken(req.user);
  }

  @Post('/signup')
  async signup(@Body() data: SignupDto) {
    try {
      return await this.authService.signup(data);
    } catch (error) {
      throw error;
    }
  }
}
