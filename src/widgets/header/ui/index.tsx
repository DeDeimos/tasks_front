
export const Header: React.FC = () => {
  return (
<header className="d-flex flex-wrap align-items-center justify-content-center py-3 mb-4 border-bottom">
      <div className="col-md-3 mb-2 mb-md-0 px-3">
        Tasks.ORG
      </div>

      <div className=" text-end px-3">
        <button type="button" className="btn btn-outline-primary me-2">Войти</button>
        <button type="button" className="btn btn-primary">Зарегистрироваться</button>
      </div>
    </header>
  );
};
