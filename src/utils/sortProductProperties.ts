import { ProductProperty } from "@/types/models/productProperty.types";
import { orderMap } from "./orderMap";
import { Property } from "@/types/models/property.types";
import { PropertyType } from "@/types/models/propertyType.types";

export const sortProductProperties = (
    productProperties: ProductProperty[],
    subcategoryName: string
) => {
    const map = orderMap[subcategoryName] || new Map();

    // Sortujemy productProperties według orderMap
    return productProperties.sort((a, b) => {
        const propertyA = a.property as Property;
        const propertyB = b.property as Property;
        const propertyTypeA = propertyA.propertyType as PropertyType;
        const propertyTypeB = propertyB.propertyType as PropertyType;

        const indexA = map.get(propertyTypeA.name) ?? Infinity;
        const indexB = map.get(propertyTypeB.name) ?? Infinity;

        return indexA - indexB;
    });
};
