import { createSlice } from "@reduxjs/toolkit";
import { TaskSliceState } from "./types";

const initialState: TaskSliceState = {
  query: "",
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setQuery: (state, { payload }) => {
      state.query = payload;
    },
  },
});

export const { setQuery } = taskSlice.actions;

export const { reducer: taskReducer } = taskSlice;