import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { TaskModel } from "../../../entities/task/model";
import { Link } from "react-router-dom";
import { useState } from "react";
// import { API_URL } from "../../../shared/config";
// import Image from "../../../assets/image.jpg"
import Photo from "../../../assets/photo.png"

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
          {/* <Button variant="success">Посмотреть</Button> */}
          <button 
          className="button"
          // style={{backgroundColor: "##eff0f5", color: "black", border: "1px solid", padding: "12px 20px", borderRadius: "12px", cursor: "pointer", borderColor: "#eff0f5", fontSize: "16px", transform: "translateY(-10px)", outline: "none"}}
          >Посмотреть</button>
        </Link>
      </Card.Body>
    </Card>
  );
};
