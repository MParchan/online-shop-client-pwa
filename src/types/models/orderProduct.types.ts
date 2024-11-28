import { Order } from "./order.types";
import { Product } from "./product.types";

export type OrderProduct = {
    _id: string;
    quantity: number;
    product: string | Product;
    order: string | Order;
    createdAt: Date;
    updatedAt: Date;
};
