import { normalizeTask } from "../../../entities/task/lib/normalizeTask";
import { RequestDto } from "../api/types";
import { Request } from "../model/types";

export const normalizeRequest = (binding: RequestDto): Request => {
  return {
    id: binding.Request_id,
    status: binding.Status,
    createdAt: binding.start_date,
    formattedAt: binding.formation_date,
    endedAt: binding.end_date,
    userId: binding.UserID,
    userName: binding.User.Name,
    moderatorId: binding.ModeratorID,
    moderatorName: binding.Moderator.Name,
    tasks: binding.Tasks?.map((document) =>
    normalizeTask(document)
    ),
  };
};