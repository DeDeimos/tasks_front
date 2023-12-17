import { UserModel, normalizeUser } from "../model";
import { API_URL } from "../../../shared/config";

export async function loginuser(): Promise<UserModel> {
  const response = await fetch(`${API_URL}/auth/login`);
  const user = await response.json();

  if (!user) {
    throw new Error(`User is not found`);
  }

  return normalizeUser(user);
}

export async function registruser(): Promise<UserModel> {
  const response = await fetch(`${API_URL}/auth/registration`);
  const user = await response.json();

  if (!user) {
    throw new Error(`User is not found`);
  }

  return normalizeUser(user);
}

export async function logout(): Promise<UserModel> {
  const response = await fetch(`${API_URL}/auth/logout`);
  const user = await response.json();

  if (!user) {
    throw new Error(`User is not found`);
  }

  return normalizeUser(user);
}
