import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Token } from '../types/token.type';

export class InputSigninDto {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  pass: string;
}

export class OutputSignInDto {
  token: Token;
}
