import React from "react";
import { Header } from "../../../widgets/header";
import { useDispatch } from "react-redux";
import { TaskSearch } from "../../../features/taskSearch/ui/TaskSearch";
import {
  Task as TaskModel,
  setQuery,
  useTaskQuery,
} from "../../../entities/task/model";
import {
  useDeleteTaskMutation,
  useGetTasksQuery,
} from "../../../entities/task/api";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const TasksPage: React.FC = () => {
  const dispatch = useDispatch();
  const query = useTaskQuery();
  const navigate = useNavigate();
  const { data: tasks, refetch } = useGetTasksQuery(query);

  const [deleteTask] = useDeleteTaskMutation();
  const onSearch = (query: string) => {
    dispatch(setQuery({ query }));
    refetch();
  };

  return (
    <div>
      <Header />
      <TaskSearch onSearch={onSearch} defaultQuery={query} />
      <h1 className="text-center">Задачи</h1>
      <div className="mb-3-container text-center">
        <Button
          onClick={() => navigate("/tasks_front/tasks/create")}
          variant="primary"
          className="mb-3"
        >
          Создать задачу
        </Button>
        <table className="table" style={{ padding: "10px", margin: "10px" }}>
          <thead
          style={{ padding: "10px" }}
          >
            <tr>
              <th>Название</th>
              <th>Предмет</th>
              <th>Миниописание</th>
              <th>Описание</th>
              <th>Редактирование</th>
              <th>Удаление</th>
            </tr>
          </thead>
          <tbody
          style={{ padding: "10px" }}
          >
            {tasks?.tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.name}</td>
                <td>{task.subject}</td>
                <td>{task.miniDescription}</td>
                <td>{task.description}</td>
                <td>
                  <Button
                    onClick={() => navigate(`/tasks_front/tasks/${task.id}`)}
                  >
                    Редактировать
                  </Button>
                </td>
                <td>
                  <Button variant="danger" onClick={() => deleteTask(task.id)}>
                    Удалить
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};