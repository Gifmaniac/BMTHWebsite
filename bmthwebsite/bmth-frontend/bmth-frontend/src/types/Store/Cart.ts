export type CartItem = {
    variantId: number;
    productId: number;
    name: string;
    price: number;
    imageUrl?: string;
    color: string;
    size: string;
    quantity: number;
};
export type Cart = {
    items: CartItem[];
};
