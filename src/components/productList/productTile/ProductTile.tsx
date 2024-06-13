import { ProductImage } from "@/types/models/image.types";
import { Product } from "@/types/models/product.types";
import Image from "next/image";
import Link from "next/link";

interface ProductTileProps {
  product: Product;
}

export default function ProductTile({ product }: ProductTileProps) {
  const mainImage: ProductImage = product.images.find((image: ProductImage) => image.main);
  return (
    <Link href="/">
      <div className="product-tile">
        {mainImage ? (
          <Image src={mainImage.image} width={400} height={400} alt="Picture of the author" />
        ) : (
          <></>
        )}
        <div>{product.name}</div>
        <div className="product-tile-price">${product.price.toFixed(2)}</div>
        <hr className="product-tile-hr" />
      </div>
    </Link>
  );
}
