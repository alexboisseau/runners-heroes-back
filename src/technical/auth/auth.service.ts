import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { compare } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import SigninDto from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(data: SigninDto): Promise<User | null> {
    const user = await this.usersService.findOne(data.email);
    if (!user) {
      return null;
    }

    const passwordIsValid = await compare(data.pass, user.password);
    if (!passwordIsValid) {
      return null;
    }

    const { password, ...result } = user;
    return result as User;
  }

  async generateJwtToken(user: User): Promise<{ access_token: string }> {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
