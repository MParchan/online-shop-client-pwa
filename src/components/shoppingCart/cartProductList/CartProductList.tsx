import CartProductItem from "./cartProductItem/CartProductItem";
import { CartItem } from "@/libs/redux/features/cart/cartSlice";

interface CartProductListProps {
  products: CartItem[];
  totalQuantity: number;
}

export default function CartProductList({ products }: CartProductListProps) {
  return (
    <div className="cart-product-list-wrapper">
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <CartProductItem product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}
