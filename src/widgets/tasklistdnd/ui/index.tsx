import { useCallback, useState } from "react";
import { Task } from "../../../entities/task/model";
import update from "immutability-helper";
import { TaskDnD } from "../../../entities/task/ui/taskdnd";

export type TaskListProps = {
    tasks: Task[];
    id: string;
    };

export const TaskList: React.FC<TaskListProps> = ({ tasks, id }) => {
    const [services, setServices] = useState(tasks);
    
    const moveTask = useCallback((dragIndex: number, hoverIndex: number) => {
        setServices((prevServices) => 
            update(prevServices, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevServices[dragIndex]],
                ],
            }),
        )
    }, []);
    const renderTask = useCallback((task: Task, index: number) => {
        return (
            <TaskDnD
                key={task.id}
                index={index}
                id={id}
                task={task}
                moveTask={moveTask}
            />
        );
    }, []);
    return(
        <>
        <div
        className="flex flex-col gap-4 w-3/4 mx-auto"
        style = {{width: "80%"}}
        >
            {services.map((task, i) => renderTask(task, i))}
        </div>
        </>
    );

}