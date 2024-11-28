import { Order } from "@/types/models/order.types";

interface OrderItemProps {
  order: Order;
}
export default function OrderItem({ order }: OrderItemProps) {
  return <div>{order._id}</div>;
}
