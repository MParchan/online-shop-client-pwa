import { Product } from "./product.types";

export type ProductImage = {
    _id: string;
    image: string;
    main: boolean;
    product: string | Product;
    createdAt: Date;
    updatedAt: Date;
};
