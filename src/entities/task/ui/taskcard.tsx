import { useState } from "react";
import { Task } from "../model";
import { useNavigate } from "react-router-dom";
import Photo from "../../../assets/no-folder.png";
import { Button } from "react-bootstrap";
import { useDraftRequestId } from "../../request/model";
import { useDeleteTaskFromRequestMutation } from "../api";

export type TaskCardProps = {
    task: Task;
    id: string;
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, id }) => {
    const [imageError, setImageError] = useState(false);
    const navigate = useNavigate();
    const handleImageError = () => {
        setImageError(true);
    };

    const draftRequestId = useDraftRequestId();
    const [handleDeleteService] = useDeleteTaskFromRequestMutation();

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
                  {id == draftRequestId && (
                    <Button
                      onClick={() =>
                        handleDeleteService({
                          id_c: String(task.id),
                          id_r: draftRequestId,
                        })
                      }
                    >
                      Удалить
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}