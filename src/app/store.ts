import { configureStore } from "@reduxjs/toolkit";
import { sessionReducer } from "../entities/session/model";
// import { sessionApi } from "../entities/session/api";
import { taskReducer } from "../entities/task/model";
import { axiosBaseApi } from "../shared/api";
import { requestReducer } from "../entities/request/model";


export const store = configureStore({
  reducer: {
    session: sessionReducer,
    task: taskReducer,
    request: requestReducer,
    api: axiosBaseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(axiosBaseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;