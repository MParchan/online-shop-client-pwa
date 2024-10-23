import { Property } from "./models/property.types";

export interface PropertyCount {
    _id: string;
    count: number;
    property: Property;
}
