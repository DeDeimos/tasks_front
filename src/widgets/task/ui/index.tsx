import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { TaskModel } from "../../../entities/task/model";
import { Link } from "react-router-dom";
import { API_URL } from "../../../shared/config";
// import Image from "../../../assets/image.jpg"

export type CardProps = {
  task: TaskModel;
};

export const Task: React.FC<CardProps> = ({ task }) => {
  return (
    <Card style={{ width: "18rem", margin: "10px" }}>
      <Card.Img variant="top" src={`${task.image}`} />
      <Card.Body>
        <Card.Title>{task.name}</Card.Title>
        <Card.Title>{task.subject}</Card.Title>
        <Card.Text>{task.minidescription}</Card.Text>
        <Link to={`/task/${task.id}`}>
          <Button variant="primary">Посмотреть</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};
