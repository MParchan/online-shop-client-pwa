import { Brand } from "./brand.types";
import { ProductImage } from "./image.types";
import { Opinion } from "./opinion.types";
import { ProductProperty } from "./productProperty.types";
import { Subcategory } from "./subcategory.types";

export type Product = {
    _id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    subcategory: string | Subcategory;
    brand: string | Brand;
    images: ProductImage[];
    productProperties: ProductProperty[];
    opinions: Opinion[];
    createdAt: Date;
    updatedAt: Date;
};
