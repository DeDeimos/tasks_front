import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '../pages/mainpage';
import { TaskPage } from '../pages/taskpage';

export const router = createBrowserRouter([
  {
    path: '/',
    // element: <MainLayout />,   
    children: [
      {
        path: '/tasks_front',
        element: <HomePage />,
        
      },
      {
        path: '/tasks_front/task/:id',
        element: <TaskPage />
      },
    ],
  },
]);
