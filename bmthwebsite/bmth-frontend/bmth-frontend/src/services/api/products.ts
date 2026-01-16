import { apiFetch } from "./helper";
import type { ProductDetail, ProductOverview } from "../../types/Store/Product";

const APPAREL_BASE = "/api/store/apparel";

export type FetchProductsParams = {
  gender: string;
};

export function fetchProducts({ gender }: FetchProductsParams): Promise<ProductOverview[]> {
  const query = new URLSearchParams({ genders: gender });
  return apiFetch<ProductOverview[]>(`${APPAREL_BASE}?${query.toString()}`);
}

export function fetchProductDetail(productId: number): Promise<ProductDetail> {
  return apiFetch<ProductDetail>(`${APPAREL_BASE}/${productId}`);
}

export function updateProductStock(productId: number, variantId: number, amount: number): Promise<ProductDetail> {
  return apiFetch<ProductDetail>(`${APPAREL_BASE}/${productId}/${variantId}/${amount}`, {
    method: "PATCH",
  });
}

export function deleteProduct(productId: number): Promise<void> {
  return apiFetch<void>(`${APPAREL_BASE}/${productId}`, { method: "DELETE" });
}

export function deleteProductVariant(productId: number, variantId: number): Promise<void> {
  return apiFetch<void>(`${APPAREL_BASE}/${productId}/${variantId}`, { method: "DELETE" });
}
