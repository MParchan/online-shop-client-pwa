import { Category } from "./category.types";
import { PropertyType } from "./propertyType.types";

export type Subcategory = {
    _id: string;
    category: string | Category;
    name: string;
    propertyTypes: PropertyType[];
    createdAt: Date;
    updatedAt: Date;
    productCount?: number;
};
