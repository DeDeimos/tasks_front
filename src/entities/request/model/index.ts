import { TaskApi } from "../../task/model";

export type RequestResponse = {
    requests: RequestApi[];
}

export type RequestApi = {
	Request_id:    string
	Status:        string
	StartDate:     string 
	FormationDate: string 
	EndDate: string
	Tasks:   TaskApi[]
}

export type RequestModel = {
    id: string
    status: string
    start_date: string
    formation_date: string
    end_date: string
}

export const normalizeRequest = (request: RequestApi): RequestModel => ({
    id: request.Request_id,
    status: request.Status,
    start_date: request.StartDate,
    formation_date: request.FormationDate,
    end_date: request.EndDate,
});