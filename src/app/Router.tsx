import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/mainpage";
import { TaskPage } from "../pages/taskpage";
import { BasketPage } from "../pages/basket";
import { RequestsPage } from "../pages/requests";
import { PublicRoute } from "../entities/session/lib/PublicRoute";
import { Auth } from "../pages/auth";
import { Reg } from "../pages/reg";
import { PrivateRoute } from "../entities/session/lib/PrivateRoute";
import { TasksPage } from "../pages/tasks";
import { TaskEditPage } from "../pages/taskedit";
import { TaskCreatePage } from "../pages/taskcreate";

export const router = createBrowserRouter([
  {
    path: "/",
    // element: <MainLayout />,
    children: [
      {
        path: "/tasks_front",
        element: <HomePage />,
      },
      {
        path: "/tasks_front/task/:id",
        element: <TaskPage />,
      },
      {
        element: <PublicRoute />,
        children: [
          {
            path: "/tasks_front/login",
            element: <Auth />,
          },
          {
            path: "/tasks_front/registration",
            element: <Reg />,
          },
        ],
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "/tasks_front/requests/:id",
            element: <BasketPage />,
          },
          {
            path: "/tasks_front/requests",
            element: <RequestsPage />,
          },
          {
            path: "/tasks_front/tasks",
            element: <TasksPage />,
          },
          {
            path: "tasks_front/tasks/:id",
            element: <TaskEditPage />,
          },
          {
            path: "/tasks_front/tasks/create",
            element: <TaskCreatePage />,
          }
        ],
      },
    ],
  },
]);
