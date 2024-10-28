import { Brand } from "./models/brand.types";

export interface BrandCount {
    _id: string;
    count: number;
    brand: Brand;
}
