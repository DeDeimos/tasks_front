import { taskApi } from "../../../entities/task/api";
import { createSlice } from "@reduxjs/toolkit";
import { RequestSliceState } from "./types";

const initialState: RequestSliceState = {
  dateTo: "",
  dateFrom: "",
  status: "",
  draftRequestId: null,
};

export const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    setDateTo: (state, action) => {
      state.dateTo = action.payload;
    },
    setDateFrom: (state, action) => {
      state.dateFrom = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      taskApi.endpoints.getTasks.matchFulfilled,
      (state, { payload }) => {
        console.log(payload);
        state.draftRequestId = payload.draftRequestId;
        console.log(state)
      }
    );
  },
});

export const { setDateFrom, setDateTo, setStatus } = requestSlice.actions;

export const { reducer: requestReducer } = requestSlice;