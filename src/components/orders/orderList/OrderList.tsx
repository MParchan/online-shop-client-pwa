import { Order } from "@/types/models/order.types";
import OrderItem from "./orderItem/OrderItem";

interface OrderListProps {
  orders: Order[];
  isAdmin?: boolean;
}

export default function OrderList({ orders, isAdmin }: OrderListProps) {
  return (
    <div className="order-list">
      {orders.length > 0 ? (
        <>
          {orders.map((order: Order) => (
            <OrderItem key={order._id} order={order} isAdmin={isAdmin} />
          ))}
        </>
      ) : (
        <div className="order-list-empty">No orders</div>
      )}
    </div>
  );
}
