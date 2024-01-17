import React, { useState } from "react";
import { Header } from "../../../widgets/header";
import { TaskRequest } from "../../../entities/task/model";
import { useCreateTaskMutation } from "../../../entities/task/api";
import { useNavigate } from "react-router-dom";

export const TaskCreatePage: React.FC = () => {
  const [task, setTask] = useState<TaskRequest | null>(null);
  const navigate = useNavigate();
  const [createTask, {isSuccess: isCreated}] = useCreateTaskMutation();

  const handleChange = (event: any) => {
    const {name, value} = event.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(task);
    createTask(task!);
  };

  if(isCreated) {
    navigate("/tasks_front/tasks");
  }

  return (
    <>
      <Header />
      <h1 className="text-center">Создание задачи</h1>
      <div className="container">
        <form
          style={{ padding: "20px", display: "flex", flexDirection: "column" }}
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Название
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Введите название"
              name="Name"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="subject" className="form-label">
              Предмет
            </label>
            <input
              type="text"
              className="form-control"
              id="subject"
              placeholder="Введите предмет"
              name="Subject"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="miniDescription" className="form-label">
              Миниописание (необязательно)
            </label>
            <input
              type="text"
              className="form-control"
              id="miniDescription"
              placeholder="Введите миниописание"
              name="Minidescription"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Описание
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              placeholder="Введите описание"
              name="Description"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Сохранить
          </button>
        </form>
      </div>
    </>
  );
};
