const API_URL = "http://localhost:5221";
const API_KEY = "ApiKey123";

export type ApiError = Error & { status?: number; data?: unknown };

const toStringArray = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];

//automatic API fetch function
export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials:"include",
    headers: {
      accept: "application/json",
      ApiKey: API_KEY,
      ...(options.headers),
    },
  });

  const contentType = response.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");
  const body = isJson ? await response.json().catch(() => null) : await response.text().catch(() => "");

  if (!response.ok) {
    const fromRoot = body && typeof body === "object" ? (body as { authList?: unknown }).authList : [];
    const fromErrors =
      body && typeof body === "object" && (body as { errors?: Record<string, unknown> }).errors
        ? (body as { errors?: Record<string, unknown> }).errors?.AuthList
        : [];

    const backendError =
      body && typeof body === "object" && "error" in body
      ? (body as any).error
      : null;
    const authList = [...toStringArray(fromRoot), ...toStringArray(fromErrors)];

    const fallback =
      typeof body === "string" && body.trim().length > 0 ? body : response.statusText || "Request failed";
    const message = backendError || (authList.length ? authList.join(" ") : fallback);

    const error: ApiError = new Error(message || `API error ${response.status}`);
    error.status = response.status;
    error.data = body;
    throw error;
  }

  return body as T;
}
