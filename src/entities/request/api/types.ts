import { TaskDto } from "../../../entities/task/api/types";

export type RequestDto = {
  Request_id: string;
  Status: string;
  start_date: string;
  formation_date: string;
  end_date: string;
  UserID: string;
  ModeratorID: string;
  Moderator: {
    Email: string;
    Name: string;
    Password: "";
    Phone: "";
    Role: "";
    User_id: 1;
  };
  User : {
    Email: string;
    Name: string;
    Password: "";
    Phone: "";
    Role: "";
    User_id: 1;
  };
  Tasks?: TaskDto[];
};

export type QueryParams = {
  status?: string;
  date_to?: string;
  date_from?: string;
};
