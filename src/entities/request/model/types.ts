import { Task } from "../../task/model/types";

export type RequestSliceState = {
  dateTo: string;
  dateFrom: string;
  status: string;
  draftRequestId: string | null;
};

export type Request = {
  id: string;
  status: string;
  createdAt: string;
  formattedAt: string;
  endedAt: string;
  userId: string;
  userName: string;
  moderatorId: string;
  moderatorName: string;
  tasks?: Task[];
};