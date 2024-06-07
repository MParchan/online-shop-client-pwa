import { ProductProperty } from "./productProperty.types";
import { PropertyType } from "./propertyType.types";

export type Property = {
    _id: string;
    value: string;
    propertyType: string | PropertyType;
    productProperties: ProductProperty[];
    createdAt: Date;
    updatedAt: Date;
};
