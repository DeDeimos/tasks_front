import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Task as TaskModel } from "../../../entities/task/model";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Photo from "../../../assets/no-folder.png";
import { useAddTaskToRequestMutation } from "../../../entities/task/api";
import { useIsAuth } from "../../../entities/session/model";
// import { API_URL } from "../../../shared/config";
// import Image from "../../../assets/image.jpg"

export type CardProps = {
  task: TaskModel;
  isAdded?: boolean;
};

export const Task: React.FC<CardProps> = ({ task, isAdded }) => {
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();
  const isAuth = useIsAuth();
  const handleImageError = () => {
    setImageError(true);
  };
  const [add, setAdd] = useState(isAdded);
  const [addToBasket] = useAddTaskToRequestMutation();
  return (
    <Card 
    onClick={() => navigate(`/tasks_front/task/${task.id}`)}
    style={{ width: "18rem", margin: "10px" }}>
      <Card.Img
        variant="top"
        src={imageError ? Photo : `${task.image}`}
        onError={handleImageError}
      />
        <Card.Body>
          <Card.Title>{task.name}</Card.Title>
          <Card.Title>{task.subject}</Card.Title>
          <Card.Text>{task.miniDescription}</Card.Text>
          <Link to={`/tasks_front/task/${task.id}`}>
          {/* <Button variant="primary"
          style={{marginRight: "2px"}}
          >Посмотреть</Button> */}
        </Link>
          {isAuth &&
          //   <Button
          //   variant={add ? "secondary" : "success"}
          //   className={add ? "disabled cursor-not-allowed" : ""}
          //   onClick={(e) => {
          //     e.stopPropagation();
          //     addToBasket(task.id)
          //     setAdd(true);
          //   }}
          // >
          //   {add ? "Добавлено" : "Добавить"}
          // </Button>}
            <button 
            className="button"
            disabled={add}
            onClick={(e) => {
              e.stopPropagation();
              addToBasket(task.id)
              setAdd(true);
            }}
            >
              {add ? "Добавлено" : "Добавить"}
            </button>
}
        </Card.Body>
    </Card>
  );
};
