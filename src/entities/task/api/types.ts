export type TaskDto = {
    Task_id: string;
    Name: string;
    Subject: string;
    Minidescription: string;
    Description: string;
    Image: string;
    Status: string
    createdAt: string;
    updatedAt: string;
  };
  
  export type TaskListDto = {
    tasks: TaskDto[];
    ActiveRequestID: number;
  };