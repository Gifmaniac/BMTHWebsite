import { apiFetch } from "./helper";

export type CreateOrderItem = {
  productId: number;
  variantId: number;
  color: string;
  size: string;
  quantity: number;
};

export type CreateOrderRequest = {
  userId: number;
  items: CreateOrderItem[];
};

export async function createOrder(payload: CreateOrderRequest): Promise<unknown> {
  return apiFetch<unknown>("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

