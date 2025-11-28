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
  authList?: string[];
};

export type LoginUserRequest = {
  email: string;
  password: string;
};

export type LoginUserResponse = {
  token?: string;
  authList?: string[];
};

export async function registerUser(payload: RegisterUserRequest): Promise<RegisterUserResponse> {
  return apiFetch<RegisterUserResponse>("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

export async function loginUser(payload: LoginUserRequest): Promise<LoginUserResponse> {
  return apiFetch<LoginUserResponse>("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}
  export async function logoutUser() {
    return apiFetch<void>("/api/auth/logout", { method: "POST" });
};

