import { ProductImage } from "@/types/models/image.types";
import { Product } from "@/types/models/product.types";
import createSlug from "@/utils/createSlug";
import Image from "next/image";
import Link from "next/link";

interface ProductTileProps {
  product: Product;
}

export default function ProductTile({ product }: ProductTileProps) {
  const mainImage: ProductImage | undefined = product.images.find(
    (image: ProductImage) => image.main
  );
  return (
    <div className="product-tile">
      <Link href={`/p/${createSlug(product.name)}/${product._id}`}>
        <div className="product-tile-content">
          {mainImage ? (
            <Image
              src={mainImage.image}
              width={300}
              height={300}
              alt="Picture of the product"
              className="product-tile-image"
              priority
            />
          ) : (
            <></>
          )}
          <div>{product.name}</div>
          <div className="product-tile-price">${product.price.toFixed(2)}</div>
          <hr className="product-tile-hr" />
        </div>
      </Link>
    </div>
  );
}
