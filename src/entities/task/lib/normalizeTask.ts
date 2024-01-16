import { TaskDto, TaskListDto } from "../api/types";
import { TaskList } from "../model";

export const normalizeTask = (task: TaskDto) => ({
  id: task.Task_id,
  name: task.Name,
  subject: task.Subject,
  miniDescription: task.Minidescription,
  description: task.Description,
  image: task.Image,
  status: task.Status,
});

export const normalizeTaskList = (taskList: TaskListDto): TaskList => ({
  tasks: taskList.tasks.map(normalizeTask),
  draftRequestId: String(taskList.ActiveRequestID),
});