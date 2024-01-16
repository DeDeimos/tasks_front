import { axiosBaseApi, SESSION_TAG } from "../../../shared/api";
import { normalizeSession } from "../lib/normalizeSession";
import { RequestLoginBody, RequestRegisterBody, SessionDto } from "./types";
import { Session } from "../model";

export const sessionApi = axiosBaseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<Session, RequestLoginBody>({
      query: (body) => ({
        url: `/auth/login`,
        method: "POST",
        data: body,
      }),
      invalidatesTags: [SESSION_TAG],
      transformResponse: (response: SessionDto) => normalizeSession(response),
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: `/auth/logout`,
        method: "POST",
      }),
      invalidatesTags: [SESSION_TAG],
    }),
    register: build.mutation<Session, RequestRegisterBody>({
      query: (body) => ({
        url: `/auth/registration`,
        method: "POST",
        data: body,
      }),
      invalidatesTags: [SESSION_TAG],
      transformResponse: (response: SessionDto) => normalizeSession(response),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  sessionApi;