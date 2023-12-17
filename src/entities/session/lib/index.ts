import { SessionDto, Session } from "../api/types";

export const normalizeSession = (sessionDto: SessionDto): Session => {
  return {
    accessToken: sessionDto.access_token,
    isAuthorized: true,
    role: sessionDto.role,
  };
};