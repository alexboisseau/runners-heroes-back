import { ApiProperty } from '@nestjs/swagger';
import { Token } from '../types/token.type';

export class InputSignupDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  firstname: string;
}

export class OutputSignUpDto {
  token: Token;
}
