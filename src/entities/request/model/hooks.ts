import { useSelector } from "react-redux";
import { RequestSliceState } from ".";

export const useRequestsFilter = () => {
  const dateTo = useSelector(
    (state: { request: RequestSliceState }) => state.request.dateTo
  );
  const dateFrom = useSelector(
    (state: { request: RequestSliceState }) => state.request.dateFrom
  );
  const status = useSelector(
    (state: { request: RequestSliceState }) => state.request.status
  );
  return { dateTo, dateFrom, status };
};

export const useDraftRequestId = () =>
  useSelector(
    (state: { request: RequestSliceState }) => state.request.draftRequestId
  );