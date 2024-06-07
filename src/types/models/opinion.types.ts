import { Product } from "./product.types";
import { User } from "./user.types";

export type Opinion = {
    _id: string;
    date: Date;
    rating: number;
    description: string;
    product: string | Product;
    user: string | User;
    createdAt: Date;
    updatedAt: Date;
};
