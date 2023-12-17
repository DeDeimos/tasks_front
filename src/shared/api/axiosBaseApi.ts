import { axiosBaseQuery } from "./AxiosBaseQuery"
import {
  BASKET_TAG,
  REQUESTS_TAG,
  TASKS_TAG,
  SESSION_TAG,
} from "./tags";
import { createApi } from "@reduxjs/toolkit/query/react";

export const axiosBaseApi = createApi({
  endpoints: () => ({}),
  baseQuery: axiosBaseQuery({ baseUrl: "http://localhost:8080" }),
  reducerPath: "api",
  tagTypes: [
    BASKET_TAG,
    REQUESTS_TAG,
    TASKS_TAG,
    SESSION_TAG,
  ],
});