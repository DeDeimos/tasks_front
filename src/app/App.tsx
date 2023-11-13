import { RouterProvider } from 'react-router-dom';
import { router } from './Router';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <RouterProvider router={router} />;
    </div>
  );
};

export default App;
