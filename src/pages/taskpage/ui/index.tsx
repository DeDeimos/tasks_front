import { Button } from "react-bootstrap";
import { Header } from "../../../widgets/header";
import { Task as TaskModel } from "../../../entities/task/model";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Photo from "../../../assets/no-folder.png";
// import { fetcTask } from "../../../entities/task/api";
import Breadcrumb from "../../../shared/ui/BreadCrumb";
import {
  useGetTasksQuery,
  useGetTaskQuery,
} from "../../../entities/task/api";
import { useIsAuth } from "../../../entities/session/model";

export const TaskPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: task, isLoading } = useGetTaskQuery(id!);
  const {data: tasks} = useGetTasksQuery('');
  const [imageError, setImageError] = useState(false);
  const isAuth = useIsAuth();

  const handleImageError = () => {
    setImageError(true);
  };

  if (!task) return null;
  return (
    <>
      <Header />
      {isLoading && <p>Загрузка...</p>}
      <Breadcrumb
        items={[
          { text: "Задание", href: "/tasks_front" },
          { text: task.name, active: true },
        ]}
      />
      <div style={{ padding: "20px", display: "flex" }}>
        <div style={{ margin: "20px" }}>
          <div className="image">
            <img
              style={{ width: "370px" }}
              src={imageError ? Photo : `${task.image}`}
              onError={handleImageError}
            />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h3>{task.subject}</h3>
          <h4>{task.name}</h4>
          {task.description}
          {/* {isAuth && (
            <Button onClick={() => addToBasket(task.id)}>
              Добавить в список занятий
            </Button>
          )} */}
        </div>
      </div>
    </>
  );
};
