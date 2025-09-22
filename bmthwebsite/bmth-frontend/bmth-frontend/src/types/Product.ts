export interface ProductOverview {
    id: number;
    name: string;
    price: number;
}

export interface Variant {
    color: string;
    size: string;
    quantity: number;
}

export interface ProductDetail {
    id: number;
    name: string;
    price: number;
    gender: string;
    meterial: string;
    totalQuantity: number;
    inStock: boolean;
    variants: Variant[];
}