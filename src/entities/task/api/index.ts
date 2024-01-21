import { TaskModel, normalizeTask } from "../model";
import { API_URL } from "../../../shared/config"
import { Tasks_MOCK } from "./mock";
export async function fetchTasks(
  title: string | null = null
): Promise<TaskModel[]> {
  try {
  let response;
  
  if (title) {
    title = title?.toLocaleLowerCase();
    response = await fetch(`${API_URL}/tasks?title=${title}`);
  } else {
    response = await fetch(`${API_URL}/tasks`);
  }

  const { tasks } = await response.json();

  return tasks.map(normalizeTask);
} catch {
  return Tasks_MOCK.map(normalizeTask).filter((task) => {
    if (title) {
      return task.subject.toLocaleLowerCase().includes(title);
    }
    return true;
  });
}
}

export async function fetcTask(id: string): Promise<TaskModel> {
  let task;
  try {
      const response = await fetch(`${API_URL}/tasks/${id}`);
       task = await response.json();

  } catch {
      task = Tasks_MOCK.find((task) => task.Task_id === id);
  }

  if (!task) {
    throw new Error(`Task with id ${id} not found`);
  }

  return normalizeTask(task);
}