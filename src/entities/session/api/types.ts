import { Role } from "../model";

export type SessionDto = {
  access_token: string;
  expires_in: number;
  token_type: string;
  role: Role;
  name: string;
};

export type RequestLoginBody = {
  login: string;
  password: string;
};

export type RequestRegisterBody = {
  email: string;
  name: string;
  passwd: string;
};