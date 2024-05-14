import { Subcategory } from "./subcategory.types";

export type Category = {
    _id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    subcategories: Subcategory[];
};
