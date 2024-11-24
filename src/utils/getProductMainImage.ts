import { ProductImage } from "@/types/models/image.types";

export const getProductMainImage = (images: ProductImage[]) => {
    const mainImage: ProductImage | undefined = images.find((image: ProductImage) => image.main);

    return mainImage;
};
