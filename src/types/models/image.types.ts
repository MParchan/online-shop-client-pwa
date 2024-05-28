import { Product } from "./product.types";

export type Image = {
    _id: string;
    image: string;
    product: string | Product;
    createdAt: Date;
    updatedAt: Date;
};
