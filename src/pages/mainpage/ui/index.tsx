import { Header } from "../../../widgets/header";
import { Task } from "../../../widgets/task";
import { useEffect, useState } from "react";
import { TaskModel } from "../../../entities/task/model";
import { useSearchParams } from "react-router-dom";
import { fetchTasks } from "../../../entities/task/api";
import { TaskSearch } from "../../../features/taskSearch/ui/TaskSearch";

export const HomePage: React.FC = () => {
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const onSearch = (query: string) => {
    if (query === "") {
      setSearchParams({});
      return;
    }
    setSearchParams({query})
  }

  useEffect(() => {
    const query = searchParams.get("query");
    fetchTasks(query).then((tasks: TaskModel[]) =>{
      setTasks(tasks);
      console.log(tasks);
    });
  }, [searchParams])

  return (
    <>
      <Header />
      <TaskSearch 
        onSearch={onSearch}
        defaultQuery={searchParams.get("query") || ""}
        />
      <div className="album py-5 bg-body-tertiary">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {tasks.map((task) => (
              <Task key={task.id} task={task} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
