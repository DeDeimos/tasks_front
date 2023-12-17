import { RequestModel, normalizeRequest } from "../model";
import { API_URL } from "../../../shared/config";

export async function fetchRequests(
    title: string | null = null
): Promise<RequestModel[]> {
    let response;

    response = await fetch(`${API_URL}/requests`);

    const {requests} = await response.json();
    return requests.map(normalizeRequest);
}

export async function fetchRequest(id: string): Promise<RequestModel> {
    const response = await fetch(`${API_URL}/requests/${id}`);
    const request = await response.json();

    if(!request) {
        throw new Error(`Request with id &{id} not found`);
    }

    return normalizeRequest(request);
}