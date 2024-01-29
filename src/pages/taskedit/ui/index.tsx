import React, { useEffect, useState } from "react";
import { Header } from "../../../widgets/header";
import { Task, TaskRequest } from "../../../entities/task/model";
import {
  useAddImageToTaskMutation,
  useGetTaskQuery,
  useUpdateTaskMutation,
} from "../../../entities/task/api";
import { useParams } from "react-router-dom";

export const TaskEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const task = useGetTaskQuery(id ?? "1");

  const [updateTask] = useUpdateTaskMutation();
  const [addImageToTask] = useAddImageToTaskMutation();

  
  const [newTask, setNewTask] = useState<TaskRequest | null>({
    Name: task?.data?.name,
    Subject: task?.data?.subject,
    Minidescription: task?.data?.miniDescription,
    Description: task?.data?.description,
    Image: task?.data?.image,
  });
useEffect(() => {
    setNewTask({
      Name: task?.data?.name,
      Subject: task?.data?.subject,
      Minidescription: task?.data?.miniDescription,
      Description: task?.data?.description,
      Image: task?.data?.image,
    });
  }
  , [task])
  console.log(newTask)
  const [error, setError] = useState<string | null>(null);
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(newTask);
    if (
      newTask?.Name === "" ||
      newTask?.Subject === "" ||
      newTask?.Description === ""
    ) {
      setError("Заполните все поля");
      return;
    }
    if (
      newTask?.Name === task?.data?.name &&
      newTask?.Subject === task?.data?.subject &&
      newTask?.Minidescription === task?.data?.miniDescription &&
      newTask?.Description === task?.data?.description &&
      newTask?.Image === task?.data?.image
    ) {
      setError("Заполните хотя бы одно поле");
      return;
    }
    updateTask({
      id: task?.data?.id ?? "",
      name: newTask?.Name ?? "",
      subject: newTask?.Subject ?? "",
      miniDescription: newTask?.Minidescription ?? "",
      description: newTask?.Description ?? "",
      image: task?.data?.image ?? "",
      status: task?.data?.status ?? "",
    });
    console.log(newTask?.Image !== task?.data?.image, newTask?.Image, task?.data?.image);
    if (newTask?.Image !== task?.data?.image) {
      let form = document.getElementById("form") as HTMLFormElement;
      let formData = new FormData(form);
      // formData.append("image", newTask?.Image ?? "");
      console.log(formData);
      addImageToTask({
        id: task?.data?.id ?? "",
        body: formData,
      });
    }

    setError(null);
  };

  return (
    <>
      <Header />
      <h1 className="text-center">Редактирование задачи</h1>
      <div
        className="container"
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          width: "70%",
        }}
      >
        {error && <div className="alert alert-danger">{error}</div>}
        <form id="form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Название
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder={task?.data?.name}
              name="Name"
              onChange={handleChange}
              value={newTask?.Name}
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
              placeholder={task?.data?.subject}
              name="Subject"
              onChange={handleChange}
              value={newTask?.Subject}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="miniDescription" className="form-label">
              Миниописание
            </label>
            <input
              type="text"
              className="form-control"
              id="miniDescription"
              placeholder={task?.data?.miniDescription}
              name="Minidescription"
              onChange={handleChange}
              value={newTask?.Minidescription}
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
              placeholder={task?.data?.description}
              name="Description"
              value={newTask?.Description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Изображение
            </label>
            <input
              type="file"
              className="form-control"
              id="Image"
              placeholder={task?.data?.image}
              name="Image"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="button">
            Сохранить
          </button>
        </form>
      </div>
    </>
  );
};
