import { Token } from '../types/token.type';

export interface InputSignupDto {
  email: string;
  password: string;
  lastname: string;
  firstname: string;
}

export interface OutputSignUpDto {
  token: Token;
}
