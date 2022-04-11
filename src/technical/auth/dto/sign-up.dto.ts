import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Token } from '../types/token.type';

export class InputSignupDto {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  lastname: string;

  @ApiProperty()
  @IsString()
  firstname: string;
}

export class OutputSignUpDto {
  token: Token;
}
