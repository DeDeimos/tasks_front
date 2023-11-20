import { TaskModel, normalizeTask } from "../model";
import { API_URL } from "../../../shared/config"

export async function fetchTasks(
  title: string | null = null
): Promise<TaskModel[]> {
  let response;
  
  if (title) {
    title = title?.toLocaleLowerCase();
    response = await fetch(`${API_URL}/tasks?title=${title}`);
  } else {
    response = await fetch(`${API_URL}/tasks`);
  }

  const { tasks } = await response.json();

  return tasks.map(normalizeTask);
}

export async function fetcTask(id: string): Promise<TaskModel> {
  const response = await fetch(`${API_URL}/tasks/${id}`);
  const task = await response.json();

  if (!task) {
    throw new Error(`Task with id ${id} not found`);
  }

  return normalizeTask(task);
}