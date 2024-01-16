import { Link, useLocation } from "react-router-dom";
import { useIsAuth, useName, useRole } from "../../../entities/session/model";
import { useLogoutMutation } from "../../../entities/session/api";

export const Header: React.FC = () => {
  const location = useLocation();
  const isAuth = useIsAuth();
  const role = useRole();
  const name = useName();

  const [logout] = useLogoutMutation();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="d-flex flex-wrap align-items-center justify-content-center py-3 mb-4 border-bottom">
      <Link to="/tasks_front/">
        <div className="col-md-3 mb-2 mb-md-0 px-3">Tasks.ORG</div>
      </Link>
      {isAuth && (
        <Link to="/tasks_front/requests">
          <div className="col-md-3 mb-2 mb-md-0 px-3">Заявки</div>
        </Link>
      )}
      {isAuth && role == "admin" && (
        <Link to="/tasks_front/tasks">
          <div className="col-md-3 mb-2 mb-md-0 px-3">Задачи</div>
        </Link>
      )}

      <div className=" text-end px-3">
        {isAuth ? (
          <>
            <span className="me-2">{name}</span>
            <button
              type="button"
              className="btn btn-outline-secondary me-2"
              onClick={handleLogout}
            >
              Выйти
            </button>
          </>
        ) : (
          <>
            <Link to="/tasks_front/login">
              <button type="button" className="btn btn-outline-primary me-2">
                Войти
              </button>
            </Link>
            <Link to="/tasks_front/registration">
              <button type="button" className="btn btn-primary">
                Зарегистрироваться
              </button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};
