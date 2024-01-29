import React from "react";
import { Button, Form } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { capitalize } from "../../../shared/lib";
import { useRegisterMutation } from "../../../entities/session/api";
import { Header } from "../../../widgets/header";

export const Reg = () => {
  const [register, { isLoading, data, error }] = useRegisterMutation();
  const [errorData, setErrorData] = React.useState<string | null>(null);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const passwd = formData.get("passwd") as string;
    const phone = formData.get("phone") as string;

    if (passwd == formData.get("passwd2")) {
      setErrorData("Пароли не совпадают");
      return;
    }
    if (name == "") {
      setErrorData("Введите имя");
      return;
    }
    if (email == "") {
      setErrorData("Введите почту");
      return;
    }
    register({ name: name, email: email, pass: passwd, phone: phone });
    setErrorData(null);
  };

  React.useEffect(() => {
    console.log(data, error);
  }, [data, error]);

  return (
    <>
      <Header />
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <h1>Регистрация</h1>
        <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <Form.Group controlId="formBasicFirstName">
            <Form.Label>Имя</Form.Label>
            <Form.Control name="name" type="text" placeholder="Иван" required />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Почта</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="example@mail.ru"
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicPhone">
            <Form.Label>Телефон</Form.Label>
            <Form.Control
              name="phone"
              type="tel"
              placeholder="+7 (999) 999-99-99"
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              name="passwd"
              type="password"
              placeholder="*****"
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Повторите пароль</Form.Label>
            <Form.Control
              name="passwd"
              type="password"
              placeholder="*****"
              required
            />
          </Form.Group>

          <p className="text-danger">
            {error && "data" in error && capitalize(error.data as string)}
          </p>


          <p className="text-danger">
            {errorData}
          </p>
          <button 
          className="button"
          type="submit">
            Зарегистрироваться
            {isLoading && "..."}
          </button>

          <Link className="text-center" to="/tasks_front/login">
            Есть аккаунт? Войдите
          </Link>

          {data && <Navigate to="/tasks_front/" replace={true} />}
        </Form>
      </div>
    </>
  );
};
