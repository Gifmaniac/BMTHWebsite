import { apiFetch } from "./helper";

export type RegisterUserRequest = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type RegisterUserResponse = {
  id?: number;
  email: string;
  firstName: string;
  lastName: string;
}

export async function registerUser(payload: RegisterUserRequest): Promise<RegisterUserResponse> {
  return apiFetch<RegisterUserResponse>("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}
