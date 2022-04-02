import { ApiProperty } from '@nestjs/swagger';
import { Token } from '../types/token.type';

export class InputSigninDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  pass: string;
}

export class OutputSignInDto {
  token: Token;
}
