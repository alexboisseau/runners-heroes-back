import { Token } from '../types/token.type';

export interface InputSigninDto {
  email: string;
  pass: string;
}

export interface OutputSignInDto {
  token: Token;
}
