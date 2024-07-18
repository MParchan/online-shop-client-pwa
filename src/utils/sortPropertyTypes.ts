import { PropertyType } from "@/types/models/propertyType.types";
import { orderMap } from "./orderMap";

export const sortPropertyTypes = (subcategoryName: string, propertyTypes: PropertyType[]) => {
    const map = orderMap[subcategoryName] || new Map();

    propertyTypes.sort((a, b) => {
        const indexA = map.get(a.name) ?? Infinity;
        const indexB = map.get(b.name) ?? Infinity;

        return indexA - indexB;
    });
};
