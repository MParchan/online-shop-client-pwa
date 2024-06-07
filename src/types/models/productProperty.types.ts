import { Product } from "./product.types";
import { Property } from "./property.types";

export type ProductProperty = {
    _id: string;
    product: string | Product;
    property: string | Property;
    createdAt: Date;
    updatedAt: Date;
};
