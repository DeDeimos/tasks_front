export type TaskResponse = {
    tasks: TaskApi[];
    entered_request_id: string;
  };
  
  export type TaskApi = {
    Task_id: string;
    Name: string;
    Subject: string;
    Minidescription: string;
    Description: string;
    Image: string;
  };
  
  export type TaskModel = {
    id: string;
    name: string;
    subject: string;
    description: string;
    minidescription: string;
    image: string;
  };
  
  export const normalizeTask = (task: TaskApi): TaskModel => ({
    id: task.Task_id,
    name: task.Name,
    subject: task.Subject,
    minidescription: task.Minidescription,
    description: task.Description,
    image: task.Image,
  });