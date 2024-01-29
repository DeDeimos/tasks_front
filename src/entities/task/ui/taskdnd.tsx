import { useRef, useState } from "react";
import { Task } from "../../../entities/task/model";
import Photo from "../../../assets/no-folder.png";
import { Button } from "react-bootstrap";
import { useDraftRequestId } from "../../request/model";
import {
  useDeleteTaskFromRequestMutation,
  useChangeTaskOrderInRequestMutation,
} from "../../../entities/task/api";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";

export type TaskCardProps = {
  task: Task;
  id: string;
  index: number;
  moveTask: (dragIndex: number, hoverIndex: number) => void;
};

export const TaskDnD: React.FC<TaskCardProps> = ({
  task,
  id,
  index,
  moveTask,
}) => {
  const [imageError, setImageError] = useState(false);
  const handleImageError = () => {
    setImageError(true);
  };

  const [deleted, setDeleted] = useState(false);

  const draftRequestId = useDraftRequestId();
  const [changeOrder] = useChangeTaskOrderInRequestMutation();
  const [handleDeleteService] = useDeleteTaskFromRequestMutation();

  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = (ref.current as any).getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as any).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveTask(dragIndex, hoverIndex);
      item.index = hoverIndex;
      console.log(id, task.id, dragIndex);
      console.log(dragIndex, hoverIndex);
      changeOrder({ id_r: id, id_c: task.id, order: dragIndex });
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div
      ref={ref}
      data-handler-id={handlerId}
      className={"card mb-3" + (deleted ? " d-none" : "")}
      key={task.id}
    >
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
                // <Button
                //   onClick={() => {
                //     handleDeleteService({
                //       id_c: String(task.id),
                //       id_r: draftRequestId,
                //     });
                //     setDeleted(true);
                //   }}
                // >
                //   Удалить
                // </Button>
                <button className="button" onClick={() => {
                  handleDeleteService({
                    id_c: String(task.id),
                    id_r: draftRequestId,
                  });
                  setDeleted(true);
                }}>
                  Удалить
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
