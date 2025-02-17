import { CartItem } from "@/libs/redux/features/cart/cartSlice";
import OrderProductItem from "./orderProductItem/OrderProductItem";

interface OrderProductListProps {
  products: CartItem[];
}

export default function OrderProductList({ products }: OrderProductListProps) {
  return (
    <div className="order-product-list-wrapper">
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <OrderProductItem product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}
