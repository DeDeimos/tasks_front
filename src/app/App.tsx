import { RouterProvider } from 'react-router-dom';
import { router } from './Router';
import { Provider } from "react-redux";
import { store } from "./store";
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
