import { CartItem } from "@/libs/redux/features/cart/cartSlice";
import Link from "next/link";
import Image from "next/image";
import createSlug from "@/utils/createSlug";

interface OrderProductItemProps {
  product: CartItem;
}

export default function OrderProductItem({ product }: OrderProductItemProps) {
  return (
    <div className="order-product-item">
      <Link href={`/p/${createSlug(product.name)}/${product._id}`} className="">
        <Image
          src={product.image || "/assets/icons/no-photography.svg"}
          alt={`${product.name} image`}
          width={80}
          height={60}
          className="order-product-item-image"
        />
      </Link>

      <div className="order-product-item-details">
        <div className="order-product-item-name">
          <Link href={`/p/${createSlug(product.name)}/${product._id}`} className="">
            {product.name}
          </Link>
        </div>
        <div className="order-product-item-info">
          <div className="order-product-item-quantity">
            {product.quantity} {product.quantity > 1 ? "pcs." : "pc."}
          </div>
          <div>${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}
