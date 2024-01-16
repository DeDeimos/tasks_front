import { Header } from "../../../widgets/header";
import { Task } from "../../../widgets/task";
import { useEffect, useState } from "react";
import { Task as TaskModel, setQuery, useTaskQuery } from "../../../entities/task/model";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useGetTasksQuery } from "../../../entities/task/api";
import { TaskSearch } from "../../../features/taskSearch/ui/TaskSearch";
import { useIsAuth } from "../../../entities/session/model";
import { useDraftRequestId } from "../../../entities/request/model";
import { useDispatch } from "react-redux";
import { useGetRequestQuery } from "../../../entities/request/api";
import { Button } from "react-bootstrap";

function isAdded(basketTasks: TaskModel[], task: TaskModel): boolean {
  return basketTasks.some((basketTask) => basketTask.id === task.id);
} 


export const HomePage: React.FC = () => {
  // const [tasks, setTasks] = useState<TaskModel[]>([]);
  // const [searchParams, setSearchParams] = useSearchParams();
  const isAuth = useIsAuth();
  const query = useTaskQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {data: tasks, refetch} = useGetTasksQuery(query.toLowerCase());
  
  const draftRequestId = useDraftRequestId();
  console.log(draftRequestId);
  // let basketTasks: TaskModel[] = [];
  // if (draftRequestId != null) {
  //   const {data: basket, isLoading} = useGetRequestQuery(draftRequestId);
  //   basketTasks = basket?.tasks ?? [];
  //   console.log(basketTasks);
  // }
  // const onSearch = (query: string) => {
  //   if (query === "") {
  //     setSearchParams({});
  //     return;
  //   }
  //   setSearchParams({query})
  // }

  const onSearch = (query: string) => {
    dispatch(setQuery(query));
    refetch();
  }

  return (
    <>
      <Header />
      <TaskSearch 
        onSearch={onSearch}
        defaultQuery={query}
        />
        <div className="container">
        {isAuth && (
          <Button 
          className={"btn btn-primary" + (draftRequestId != "null" ? "" : " disabled")} 
          onClick={() => navigate(`/tasks_front/requests/${draftRequestId}`)}
          
          >
            Корзина
          </Button>
        )}
        </div>
      <div className="album py-5 bg-body-tertiary">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {tasks?.tasks.map((task) => (
              <Task key={task.id} task={task} isAdded={false} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
