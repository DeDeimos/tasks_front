export type TaskSliceState = {
    query: string;
  };
  
  export type Task = {
    id: string;
    name: string;
    subject: string;
    miniDescription: string;
    description: string;
    image: string;
    status: string
  };

  export type TaskRequest = {
    Name?: string|undefined;
    Subject?: string|undefined;
    Minidescription?: string|undefined;
    Description?: string|undefined;
    Image?: string|undefined;
  };

  export type TaskList = {
    tasks: Task[];
    draftRequestId: string;
  };

  export type TaskImage = FormData;