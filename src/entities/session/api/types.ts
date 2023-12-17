export type SessionDto = {
  access_token: string;
  expires_in: number;
  token_type: string;
  role: string;
};

export type RequestLoginBody = {
  email: string;
  passwd: string;
};

export type RequestRegisterBody = {
  email: string;
  name: string;
  passwd: string;
};

export type Session =
  | {
      accessToken: string;
      isAuthorized: true;
      role: string;
    }
  | {
      isAuthorized: false;
      accessToken?: string;
      role?: string;
    };
