import { useState } from "react";
import { Task } from "../model";
import Photo from "../../../assets/no-folder.png";

export type TaskCardProps = {
    task: Task;
    id: string;
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, id }) => {
    const [imageError, setImageError] = useState(false);
    const handleImageError = () => {
        setImageError(true);
    };

    return(
        <div className="card mb-3" key={task.id}>
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={imageError ? Photo : `${task.image}`}
                className="img-fluid rounded-start"
                alt="..."
                onError={handleImageError}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <div className="card-title">
                  <h5>{task.subject}</h5>
                </div>
                <div className="card-text">
                  <p>{task.name}</p>
                  <p>{task.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}