import React, { useEffect, useState } from "react";
import { Header } from "../../../widgets/header";
import { useDispatch } from "react-redux";
import {
  setDateFrom,
  setDateTo,
  setStatus,
  useRequestsFilter,
} from "../../../entities/request/model";
import {
  useCompleteRequestMutation,
  useDenyRequestMutation,
  useGetRequestsQuery,
} from "../../../entities/request/api";
import { Link, useNavigate } from "react-router-dom";
import { useName, useRole } from "../../../entities/session/model";
import { Button } from "react-bootstrap";
const STATUS_MAP: Record<string, string> = {
  on_check: "На проверке",
  completed: "Завершенные",
  rejected: "Отклоненные",
};

function formatIsoDate(isoDateString: string | null): string {
  if (!isoDateString) {
    return "Нет данных";
  }

  const dateObject = new Date(isoDateString);

  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObject.getDate().toString().padStart(2, "0");
  const hours = dateObject.getHours().toString().padStart(2, "0");
  const minutes = dateObject.getMinutes().toString().padStart(2, "0");
  const seconds = dateObject.getSeconds().toString().padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  // return `${year}-${month}-${day}`;
}

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

function userSearch(requests: any, search: string) {
  return requests.filter((request: any) => {
    return request.userName.toLowerCase().indexOf(search.toLowerCase()) !== -1;
  });
}

export const RequestsPage: React.FC = () => {
  const dispatch = useDispatch();
  const role = useRole();
  const { dateFrom, dateTo, status } = useRequestsFilter();
  const [completeRequest, { isSuccess: isSuccessComplete }] =
    useCompleteRequestMutation();
  const [denyRequest, { isSuccess: isSuccessDeny }] = useDenyRequestMutation();

  const {
    data: requests,
    isLoading,
    refetch,
  } = useGetRequestsQuery({
    date_from: dateFrom,
    date_to: dateTo,
    status,
  });

  useEffect(() => {
    const idInterval = setInterval(() => {
      refetch();
    }, 5000);
    return () => {
      clearInterval(idInterval);
    };
  }, []);

  const handleDateFromChange = (value: string) => {
    dispatch(setDateFrom(value));
  };

  const handleDateToChange = (value: string) => {
    dispatch(setDateTo(value));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setStatus(e.currentTarget.value));
  };

  const handleComplete = (id: string) => {
    completeRequest(id);
  };

  const handleDeny = (id: string) => {
    denyRequest(id);
  };

  const [search, setSearch] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
    console.log(search);
  };

  const navigate = useNavigate();

  console.log(requests);
  return (
    <div>
      <Header />
      <h2>Фильтрация</h2>
      <div className="mb-3 container">
        <input
          type="date"
          value={dateFrom}
          style={{ marginRight: "10px", padding: "2px" }}
          className="me-3 border-1 border-dark rounded"
          onChange={(e) => handleDateFromChange(e.target.value)}
        />
        <input
          type="date"
          value={dateTo}
          style={{ marginRight: "10px", padding: "2px" }}
          className="me-3 border-1 border-dark rounded"
          onChange={(e) => handleDateToChange(e.target.value)}
        />
        <select
          value={status}
          onChange={(e) => handleStatusChange(e)}
          className="me-3 border-1 border-dark rounded"
        >
          <option value="">Все</option>
          {Object.keys(STATUS_MAP).map((status) => (
            <option key={status} value={status}>
              {STATUS_MAP[status]}
            </option>
          ))}
        </select>
        {role === "admin" && (
          <input
            type="text"
            placeholder="Поиск по пользователю"
            className="me-3 border-1 border-dark rounded"
            onChange={(e) => handleSearch(e)}
          />
        )}
      </div>

      <h1>Занятия</h1>
      <div className="mb-3 container">
        <table className="table" style={{ padding: "10px", margin: "10px" }}>
          <thead style={{ padding: "10px" }}>
            <tr style={{ padding: "10px" }}>
              <th style={{ padding: "10px" }}>Дата создания</th>
              <th style={{ padding: "10px" }}>Дата формирования</th>
              <th style={{ padding: "10px" }}>Дата завершения</th>
              <th style={{ padding: "10px" }}>Статус</th>
              <th style={{ padding: "10px" }}>Пользователь</th>
              <th style={{ padding: "10px" }}>Модератор</th>
              {role === "admin" ? <th>Подтвердить</th> : ""}
              {role === "admin" ? <th>Отклонить</th> : ""}
            </tr>
          </thead>
          <tbody style={{ padding: "10px" }}>
            {requests?.filter((request: any) => {
              if (search == "") {
                return request;
              } else if (
                request.userName
                  .toLowerCase()
                  .includes(search.toLocaleLowerCase())
              ) {
                return request;
              }
            })
            ?.map((request, index) => (
              <tr
                key={index}
                onClick={() => navigate(`/tasks_front/requests/${request.id}`)}
                style={{ cursor: "pointer", padding: "10px" }}
              >
                <td style={{ padding: "10px" }}>
                  {formatIsoDate(request.createdAt)}
                </td>
                <td style={{ padding: "10px" }}>
                  {request.status == "draft"
                    ? "---"
                    : formatIsoDate(request.formattedAt)}
                </td>
                <td style={{ padding: "10px" }}>
                  {request.status == "on_check"
                    ? "---"
                    : formatIsoDate(request.endedAt)}
                </td>
                <td style={{ padding: "10px" }}>{rus(request.status)}</td>
                <td style={{ padding: "10px" }}>{request.userName}</td>
                <td style={{ padding: "10px" }}>
                  {request.status == "on_check" ? "---" : request.moderatorName}
                </td>
                {role === "admin" ? (
                  <td style={{ padding: "10px" }}>
                    {request.status == "on_check" ? (
                      <button
                        className="button" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleComplete(request.id);
                        }}
                      >
                        Подтвердить
                      </button>
                    ) : (
                      "---"
                    )}
                  </td>
                ) : (
                  ""
                )}
                {role === "admin" ? (
                  <td style={{ padding: "10px" }}>
                    {request.status == "on_check" ? (
                      <button
                      className="button"
                      onClick={(e) => {
                          e.stopPropagation();
                          handleDeny(request.id);
                        }}
                      >
                        Отклонить
                      </button>
                    ) : (
                      "---"
                    )}
                  </td>
                ) : (
                  ""
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
