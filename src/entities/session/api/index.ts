import { axiosBaseApi, SESSION_TAG } from "../../../shared/api";
import { normalizeSession } from "../lib/index";
import { RequestLoginBody, RequestRegisterBody, SessionDto, Session } from "./types";

export const sessionApi = axiosBaseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<Session, RequestLoginBody>({
      query: (body) => ({
        url: `/login`,
        method: "POST",
        data: body,
      }),
      invalidatesTags: [SESSION_TAG],
      transformResponse: (response: SessionDto) => normalizeSession(response),
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: `/logout`,
        method: "POST",
      }),
      invalidatesTags: [SESSION_TAG],
    }),
    register: build.mutation<Session, RequestRegisterBody>({
      query: (body) => ({
        url: `/registration`,
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