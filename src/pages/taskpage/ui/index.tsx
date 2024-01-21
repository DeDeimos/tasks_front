import { Header } from "../../../widgets/header";
import { TaskModel } from "../../../entities/task/model";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetcTask } from "../../../entities/task/api";
import Breadcrumb from "../../../shared/ui/BreadCrumb";
import Photo from "../../../assets/photo.png"

export const TaskPage: React.FC = () => {
  const [task, setTask] = useState<TaskModel | null>(null);
  const { id } = useParams<{ id: string }>();
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  }

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
          { text: "Задание", href: "/tasks_front" },
          { text: task.name, active: true },
        ]}
      />
      <div style={{padding: "20px", display: "flex"}}>
        <div style={{margin: "20px"}}>
          <div className="image">
            <img 
            style={{width: "370px"}} 
            src={imageError ? Photo : `${task.image}`}
            onError={handleImageError} 
            />
          </div>
        </div>
        <div style={{display: "flex", flexDirection: "column"}}>
          <h3>{task.subject}</h3>
          {task.description}
          {/* <Button>Добавить в список занятий</Button> */}
        </div>
      </div>
    </>
  );
};
