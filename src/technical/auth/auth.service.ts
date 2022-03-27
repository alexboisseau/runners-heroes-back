import { Injectable, NotFoundException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (!user) {
      throw new NotFoundException('No user found for this email or pseudo.');
    }

    const passwordIsValid = await compare(user.password, pass);
    if (!passwordIsValid) {
      throw new NotFoundException('Invalid password');
    }

    const { password, ...result } = user;
    return result;
  }
}
