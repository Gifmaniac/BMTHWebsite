export interface ProductOverview {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    category: string;
}

export interface Variant {
    variantId?: number;
    id?: number;
    color: string;
    size: string;
    quantity: number;
    imageUrlsList: string[];
    inStock: boolean;
}

export interface ProductDetail {
    id: number;
    name: string;
    price: number;
    gender: string;
    material: string;
    totalQuantity: number;
    inStock: boolean;
    variants: Variant[];
}
