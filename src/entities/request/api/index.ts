import { axiosBaseApi, BASKET_TAG, REQUESTS_TAG } from "../../../shared/api";
import { normalizeRequest } from "../lib/normalizeRequest";
import { RequestDto, QueryParams } from "./types";
import { Request } from "../model/types";

function formatAndAddTime(originalString: string, additionalDate: string = "23:59:59"): string {
  // Разбираем строку в объект Date
  const originalDate = new Date(originalString);

  // Форматируем новую строку с нужным порядком даты и добавляем время
  const formattedDate = `${originalDate.getFullYear()}-${(originalDate.getDate() < 10 ? '0' : '') + originalDate.getDate()}-${(originalDate.getMonth() + 1 < 10 ? '0' : '') + (originalDate.getMonth() + 1)}`;
  const newString = `${formattedDate } ${additionalDate}`

  return newString;
}

export const requestApi = axiosBaseApi.injectEndpoints({
  endpoints: (build) => ({
    getRequests: build.query<Request[], QueryParams>({
      query: ({ date_from, date_to, status }) => ({
        url: `/requests`,
        method: "GET",
        params: {
          startDate: date_from ? formatAndAddTime(date_from, "00:00:00") : undefined,
          endDate: date_to ? formatAndAddTime(date_to) : undefined,
          status,
        },
      }),
      providesTags: [REQUESTS_TAG],
      transformResponse: (response: RequestDto[]) =>
        response.map((binding) => normalizeRequest(binding)),
    }),
    getRequest: build.query<Request, string>({
      query: (id) => ({
        url: `/requests/${id}`,
        method: "GET",
      }),
      providesTags: [REQUESTS_TAG],
      transformResponse: (response: RequestDto) => normalizeRequest(response),
    }),
    updateRequest: build.mutation<
      Request,
      { bindingId: string; veteranId: string }
    >({
      query: ({ bindingId, veteranId }) => ({
        url: `/bindings/${bindingId}`,
        method: "PUT",
        data: { veteran_id: veteranId },
      }),
      invalidatesTags: [REQUESTS_TAG, BASKET_TAG],
      transformResponse: (response: RequestDto) => normalizeRequest(response),
    }),
    submitBinding: build.mutation<void, string>({
      query: (id) => ({
        url: `/requests/user/${id}/update-status`,
        method: "PUT",
        data: { status: "on_check" },
      }),
      invalidatesTags: [REQUESTS_TAG, BASKET_TAG],
    }),
    acceptRejectBinding: build.mutation<void, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `requests/admin/${id}/update-status`,
        method: "PUT",
        data: { status },
      }),
      invalidatesTags: [REQUESTS_TAG, BASKET_TAG],
    }),
    completeRequest: build.mutation<void, string>({
      query: (id) => ({
        url: `/requests/admin/${id}/update-status`,
        method: "PUT",
        data: { status: "completed" },
      }),
      invalidatesTags: [REQUESTS_TAG, BASKET_TAG],
    }),
    denyRequest: build.mutation<void, string>({
      query: (id) => ({
        url: `/requests/admin/${id}/update-status`,
        method: "PUT",
        data: { status: "rejected" },
      }),
      invalidatesTags: [REQUESTS_TAG, BASKET_TAG],
    }),
    deleteBinding: build.mutation<void, string>({
      query: (id) => ({
        url: `/requests/user/${id}/update-status`,
        method: "PUT",
        data: { status: "deleted" },
      }),
      invalidatesTags: [REQUESTS_TAG, BASKET_TAG],
    }),
  }),
});

export const {
  useGetRequestsQuery,
  useGetRequestQuery,
  useUpdateRequestMutation,
  useSubmitBindingMutation,
  useAcceptRejectBindingMutation,
  useDeleteBindingMutation,
  useCompleteRequestMutation,
  useDenyRequestMutation,
} = requestApi;