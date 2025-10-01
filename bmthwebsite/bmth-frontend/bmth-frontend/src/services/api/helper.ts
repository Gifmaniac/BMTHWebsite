const API_URL = "https://localhost:7297"
const API_KEY = "ApiKey123";

// Creates a automatic API fetch function, so that I dont have to repeat the API call on every single page. 
export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "accept": "application/json",
      "ApiKey": API_KEY,
      ...(options.headers || {})
    }
  });

  if (!response.ok) {
    throw new Error(`API error ${response.status}: ${response.statusText}`);
  }

  return response.json()  as Promise<T>;
}
