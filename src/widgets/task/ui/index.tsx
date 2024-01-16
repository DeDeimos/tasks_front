import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { TaskModel } from "../../../entities/task/model";
import { Link } from "react-router-dom";
import { useState } from "react";
// import { API_URL } from "../../../shared/config";
// import Image from "../../../assets/image.jpg"
import Photo from "../../../assets/image.png"

export type CardProps = {
  task: TaskModel;
};

export const Task: React.FC<CardProps> = ({ task }) => {
  const [imageError, setImageError] = useState(false);
  
  const handleImageError = () => {
    setImageError(true);
  }
  return (
    <Card style={{ width: "18rem", margin: "10px" }}>
      <Card.Img 
      variant="top" 
      src={imageError ? Photo :`${task.image}`}
      onError={handleImageError} 
      />
      <Card.Body>
        <Card.Title>{task.name}</Card.Title>
        <Card.Title>{task.subject}</Card.Title>
        <Card.Text>{task.minidescription}</Card.Text>
        <Link to={`/tasks_front/task/${task.id}`}>
          <Button variant="success">Посмотреть</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};
