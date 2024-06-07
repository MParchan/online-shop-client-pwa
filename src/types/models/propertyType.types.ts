import { Property } from "./property.types";
import { Subcategory } from "./subcategory.types";

export type PropertyType = {
    _id: string;
    name: string;
    type: string;
    subcategory: string | Subcategory;
    properties: Property[];
    createdAt: Date;
    updatedAt: Date;
};
