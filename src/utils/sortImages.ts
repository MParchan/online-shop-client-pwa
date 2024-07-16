import { ProductImage } from "@/types/models/image.types";

const SortImages = (images: ProductImage[]) => {
    const mainImageIndex = images.findIndex((image) => image.main);

    if (mainImageIndex !== -1) {
        const mainImage = images.splice(mainImageIndex, 1)[0];
        images.unshift(mainImage);
    }
    return images;
};

export default SortImages;
