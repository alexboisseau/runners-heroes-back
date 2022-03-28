import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { InputSigninDto } from './dto/signin.dto';
import { InputSignupDto } from './dto/signup.dto';
import { Token } from './types/token.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(data: InputSigninDto): Promise<User | null> {
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

  async generateJwtToken(user: User): Promise<{ accessToken: string }> {
    const payload = { email: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async signin(user: User): Promise<Token> {
    const { accessToken } = await this.generateJwtToken(user);
    return {
      accessToken,
      userId: user.id,
    };
  }

  async signup(data: InputSignupDto): Promise<Token> {
    const user = await this.usersService.findOne(data.email);
    if (user) {
      throw new BadRequestException('This email is already use');
    }

    data.password = await hash(data.password, 10);

    const createdUser = await this.usersService.createOne(data);

    const token = await this.generateJwtToken(createdUser);

    return {
      ...token,
      userId: createdUser.id,
    };
  }
}
