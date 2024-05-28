import { Category } from "./category.types";

export type Subcategory = {
    _id: string;
    category: string | Category;
    name: string;
    createdAt: Date;
    updatedAt: Date;
};
