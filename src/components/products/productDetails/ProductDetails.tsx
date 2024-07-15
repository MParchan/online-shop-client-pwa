import { ProductImage } from "@/types/models/image.types";
import { Product } from "@/types/models/product.types";
import Image from "next/image";
import React from "react";

export default function ProductDetails({ product }: { product: Product }) {
  const mainImage: ProductImage | undefined = product.images.find(
    (image: ProductImage) => image.main
  );
  return (
    <div className="product-details">
      <div className="product-details-main">
        <div className="product-details-images">
          {mainImage ? (
            <Image
              src={mainImage.image}
              width={900}
              height={900}
              alt="Picture of the product"
              className="product-tile-image"
              priority
            />
          ) : (
            <></>
          )}
        </div>
        <div className="product-details-info">
          <div className="product-details-info-name">{product.name}</div>
          <div className="product-details-price">${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}
