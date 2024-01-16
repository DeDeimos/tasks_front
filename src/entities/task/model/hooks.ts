import { useSelector } from "react-redux";
import { TaskSliceState } from "./types";

export const useTaskQuery = () =>
  useSelector(
    (state: { task: TaskSliceState }) => state.task.query
  );