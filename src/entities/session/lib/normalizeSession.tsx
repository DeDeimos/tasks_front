import { SessionDto } from "../api/types";
import { Session } from "../model";

export const normalizeSession = (sessionDto: SessionDto): Session => {
  return {
    accessToken: sessionDto.access_token,
    isAuthorized: true,
    role: sessionDto.role,
    name: sessionDto.name,
  };
};