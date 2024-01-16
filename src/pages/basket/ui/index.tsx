import React, { useState } from "react";
import { Header } from "../../../widgets/header";
import { useNavigate, useParams } from "react-router-dom";
import { useDraftRequestId } from "../../../entities/request/model";
import {
  useAcceptRejectBindingMutation,
  useCompleteRequestMutation,
  useDeleteBindingMutation,
  useDenyRequestMutation,
  useGetRequestQuery,
  useSubmitBindingMutation,
} from "../../../entities/request/api";
import { useDeleteTaskFromRequestMutation } from "../../../entities/task/api";
import { Button, Container } from "react-bootstrap";
import { store } from "../../../app/store";
import { HTML5Backend } from 'react-dnd-html5-backend'
import Photo from "../../../assets/no-folder.png";
import Breadcrumb from "../../../shared/ui/BreadCrumb";
import { useRole } from "../../../entities/session/model";
import { TaskCard } from "../../../entities/task/ui/taskcard";
import { TaskList } from "../../../widgets/tasklistdnd";
import { DndProvider } from "react-dnd";

function rus(s: string) {
  if (s == "on_check") {
    return "На проверке";
  }
  if (s == "completed") {
    return "Завершена";
  }
  if (s == "rejected") {
    return "Отклонена";
  }
  if (s == "draft") {
    return "Черновик";
  }
  return s;
}

export const BasketPage: React.FC = () => {
  const navigate = useNavigate();
  // console.log(store)
  const { id } = useParams<{ id: string }>();
  const draftRequestId = useDraftRequestId();
  // console.log(draftRequestId);
  const { data: basket, isLoading } = useGetRequestQuery(id ?? "1");
  // console.log(basket);
  const [handleDeleteService] = useDeleteTaskFromRequestMutation();
  const role = useRole();
  const [submitBasket, {isSuccess: isSuccessSubmit}] = useSubmitBindingMutation();
  const [deleteBasket, {isSuccess: isSuccessDelete}] = useDeleteBindingMutation();
  const [completeRequest, {isSuccess: isSuccessComplete}] = useCompleteRequestMutation();
  const [denyRequest, {isSuccess: isSuccessDeny}] = useDenyRequestMutation();

  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = () => {
    submitBasket(draftRequestId!);
    // navigate("/tasks_front/");
  };

  const handleDelete = () => {
    deleteBasket(draftRequestId!);
    // navigate("/tasks_front/");
  };

  const handleComplete = React.useCallback(() => {
    // console.log("id", id, "status", "completed");
    completeRequest(id!);
    
  }, [id]);

  const handleDeny = () => {
    console.log("id", id, "status", "rejected");
    denyRequest(id!);
  };

  const [imageError, setImageError] = useState(false);
  const handleImageError = () => {
    setImageError(true);
  };

  if (isSuccessSubmit) {
    navigate("/tasks_front/");
  }

  if (isSuccessDelete) {
    navigate("/tasks_front/");
  }

  if (isSuccessComplete) {
    navigate("/tasks_front/");
  }

  if (isSuccessDeny) {
    navigate("/tasks_front/");
  }


  if (!draftRequestId || !basket?.tasks?.length) {
    return (
      <>
        <Header />
        {/* <Container className="d-grid gap-4" style={{ marginTop: "80px" }}>
          <h1 className="h1 text-center">Корзина пуста</h1>
        </Container> */}
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Загрузка...</span>
          </div>
        </div>
      </>
    );
  }

  return (
    <div>
      <Header />
      <Breadcrumb
        items={[
          { text: "Заявки", href: "/tasks_front/requests" },
          { text: "Корзина", active: true },
        ]}
      />
      <div className="text-center">
        <b>Статус заявки:</b> {rus(basket.status)}
      </div>
      
      <div className="text-center">
        <b>Модератор заявки: </b>
        {basket.status == "on_check" || basket.status == "draft"
          ? "---"
          : basket.moderatorName}
        {/* {basket.endedAt} */}
      </div>
      
      {/* if(id == draftRequestId) {
        <DndProvider backend={HTML5Backend}>
          <TaskList tasks={basket.tasks} id={id!} />
        </DndProvider>
      } else {
        <div>
          {basket.tasks.map((service, index) => (
            <TaskCard task={service} id={id!} />
          ))}
        </div>
      } */}
      {id == draftRequestId ? (
        <DndProvider backend={HTML5Backend}>
          <TaskList tasks={basket.tasks} id={id!} />
        </DndProvider>
      ) : (
        <div 
        style={{display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center", width: "80%", margin: "auto"}}
        >
          {basket.tasks.map((service, index) => (
            <TaskCard task={service} id={id!} />
          ))}
        </div>
      )}
      
{/* 
      {basket.tasks.map((service, index) => (
        <TaskCard task={service} id={id!} />
      ))} */}

      {id == draftRequestId && (
        <Button 
        onClick={handleSubmit}
        variant="success"
        >Создать заявку</Button>
      )}
      {id == draftRequestId && (
        <Button 
        onClick={handleDelete}
        variant="danger" 
        >Удалить заявку</Button>
      )}
      {role == "admin" && basket.status == "on_check" && (
        <Button variant="success" onClick={handleComplete}>
          Подтвердить
        </Button>
      )}
      {role == "admin" && basket.status == "on_check" && (
        <Button variant="danger" onClick={handleDeny}>
          Отклонить
        </Button>
      )}
    </div>
  );
};
