export type SessionSliceState =
  | {
      accessToken: string;
      isAuthorized: true;
      role: Role;
      name: string;
    }
  | {
      accessToken?: string;
      isAuthorized: false;
      role?: Role;
      name?: string;
    };

export type Session =
  | {
      accessToken: string;
      isAuthorized: true;
      role: Role;
      name: string;
    }
  | {
      accessToken?: string;
      isAuthorized: false;
      role?: Role;
      name?: string;
    };

export type SessionUserId = string;

export type Role = "admin" | "user";