import { axiosBaseQuery } from "./axiosBaseQuery"
import {
  BASKET_TAG,
  REQUESTS_TAG,
  TASKS_TAG,
  SESSION_TAG,
} from "./tags";
import { createApi } from "@reduxjs/toolkit/query/react";

export const axiosBaseApi = createApi({
  endpoints: () => ({}),
  baseQuery: axiosBaseQuery({
    baseUrl: "http://185.204.2.233:8079",
  }),
  reducerPath: "api",
  tagTypes: [
    BASKET_TAG,
    REQUESTS_TAG,
    TASKS_TAG,
    SESSION_TAG,
  ],
});