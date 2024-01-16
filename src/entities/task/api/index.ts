import {
  axiosBaseApi,
  REQUESTS_TAG,
  SESSION_TAG,
  TASKS_TAG,
  BASKET_TAG,
} from "../../../shared/api";
import { normalizeTask, normalizeTaskList } from "../lib/normalizeTask";
import { TaskDto, TaskListDto } from "./types";
import { Task, TaskImage, TaskList, TaskRequest } from "../model/types";

export const taskApi = axiosBaseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<TaskList, string>({
      query: (title) => ({
        url: `/tasks`,
        method: "GET",
        params: { title },
      }),
      providesTags: [TASKS_TAG, SESSION_TAG, BASKET_TAG],
      transformResponse: (response: TaskListDto) => normalizeTaskList(response),
    }),
    getTask: build.query<Task, string>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "GET",
      }),
      providesTags: [TASKS_TAG],
      transformResponse: (response: TaskDto) => normalizeTask(response),
    }),
    AddTaskToRequest: build.mutation<void, string>({
      query: (id) => ({
        url: `/tasks/${id}/add-to-request`,
        method: "POST",
      }),
      invalidatesTags: [TASKS_TAG, REQUESTS_TAG],
    }),
    DeleteTaskFromRequest: build.mutation<void, { id_c: string; id_r: string }>(
      {
        query: ({ id_c, id_r }) => ({
          url: `/task-request/delete/task/${id_c}/request/${id_r}`,
          method: "DELETE",
        }),
        invalidatesTags: [TASKS_TAG, REQUESTS_TAG],
      }
    ),
    CreateTask: build.mutation<void, TaskRequest>({
      query: (body) => ({
        url: `/tasks/create`,
        method: "POST",
        data: {
          Name: body.Name,
          Subject: body.Subject,
          Minidescription: body.Minidescription,
          Description: body.Description,
          Status: "active",
          // Image: "https://i.pinimg.com/originals/0a/0b/9a/0a0b9a5b6b5b6b5b6b5b6b5b6b5b6b5b.jpg",
        },
      }),
      invalidatesTags: [TASKS_TAG],
    }),
    UpdateTask: build.mutation<void, Task>({
      query: (body) => ({
        url: `/tasks/update/${body.id}`,
        method: "PUT",
        data: {
          Name: body.name,
          Subject: body.subject,
          Minidescription: body.miniDescription,
          Description: body.description,
          Status: body.status,
          Image: body.image,
        },
      }),
      invalidatesTags: [TASKS_TAG],
    }),
    DeleteTask: build.mutation<void, string>({
      query: (id) => ({
        url: `/tasks/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TASKS_TAG],
    }),
    AddImageToTask: build.mutation<void, { id: string; body: TaskImage }>({
      query: ({ id, body }) => ({
        url: `/tasks/${id}/add-image`,
        method: "PUT",
        data: body,
      }),
      invalidatesTags: [TASKS_TAG],
    }),
    ChangeTaskOrderInRequest: build.mutation< void, { id_c: string; id_r: string; order: number }>({
      query: ({ id_c, id_r, order }) => ({
        url: `/task-request/change/task/${id_c}/request/${id_r}/order/${order}`,
        method: "PUT",
      }),
      invalidatesTags: [TASKS_TAG, REQUESTS_TAG],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskQuery,
  useAddTaskToRequestMutation,
  useDeleteTaskFromRequestMutation,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useAddImageToTaskMutation,
  useChangeTaskOrderInRequestMutation,
} = taskApi;
