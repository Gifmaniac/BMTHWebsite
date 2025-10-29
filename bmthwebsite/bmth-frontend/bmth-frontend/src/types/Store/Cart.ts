export type CartItem = {
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
