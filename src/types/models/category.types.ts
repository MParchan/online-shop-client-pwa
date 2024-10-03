import { Subcategory } from "./subcategory.types";

export type Category = {
    _id: string;
    name: string;
    subcategories: Subcategory[];
    createdAt: Date;
    updatedAt: Date;
    productCount?: number;
};
