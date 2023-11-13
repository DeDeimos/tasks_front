import { Button } from "react-bootstrap";
import { Header } from "../../../widgets/header";
import { TaskModel } from "../../../entities/task/model";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetcTask } from "../../../entities/task/api";
import Breadcrumb from "../../../shared/ui/BreadCrumb";

export const TaskPage: React.FC = () => {
  const [task, setTask] = useState<TaskModel | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) return;
    fetcTask(id).then((task) => {
      setTask(task);
      console.log(task);
    });
  }, [id]);

  if (!task) return null;
  return (
    <>
      <Header />
      <Breadcrumb
        items={[
          { text: "Задание", href: "/" },
          { text: task.name, active: true },
        ]}
      />
      <div>
        <div>
          <p>{task.subject}</p>
          <div className="image">
            <img src={task.image} />
          </div>
        </div>
        <div>
          {task.description}
          <Button>Добавить</Button>
        </div>
      </div>
    </>
  );
};
