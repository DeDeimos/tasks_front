import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '../pages/mainpage';
import { TaskPage } from '../pages/taskpage';

export const router = createBrowserRouter([
  {
    path: '/',
    // element: <MainLayout />,   
    children: [
      {
        path: '/',
        element: <HomePage />,
        
      },
      {
        path: '/task/:id',
        element: <TaskPage />
      },
    ],
  },
]);
