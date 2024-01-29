import React from "react";
import { Button, Form } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { capitalize } from "../../../shared/lib";
import { useLoginMutation } from "../../../entities/session/api";
import { Header } from "../../../widgets/header";

export const Auth = () => {
  const [login, { isLoading, data, error }] = useLoginMutation();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const passwd = formData.get("passwd") as string;

    login({ login: email, password: passwd });
  };

  return (
    <>
      <Header />
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <h1>Авторизация</h1>
        <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Почта</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="example@mail.ru"
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

          <p className="text-danger">
            {error && "data" in error && capitalize(error.data as string)}
          </p>

          <button 
          className="button"
          type="submit">
            Войти
            {isLoading && "..."}
          </button>

          <Link className="text-center" to="/tasks_front/registration">
            Еще нет аккаунта? Зарегистрироваться
          </Link>

          {data && <Navigate to="/tasks_front/" replace={true} />}
        </Form>
      </div>
    </>
  );
};
