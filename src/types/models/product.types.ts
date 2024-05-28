import { Brand } from "./brand.types";
import { Image } from "./image.types";
import { Subcategory } from "./subcategory.types";

export type Product = {
    _id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    subcategory: string | Subcategory;
    brand: string | Brand;
    images?: Image[];
    createdAt: Date;
    updatedAt: Date;
};
