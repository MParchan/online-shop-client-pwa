import Button from "@/components/ui/button/Button";
import { Order } from "@/types/models/order.types";
import { format } from "date-fns";
import Link from "next/link";

interface OrderItemProps {
  order: Order;
}
export default function OrderItem({ order }: OrderItemProps) {
  return (
    <div className="order-item">
      <div>
        <div>
          Nr: <b>{order._id}</b>
        </div>
        <div>
          Date: <b>{format(new Date(order.date), "d MMMM yyyy")}</b>
        </div>
        <div>
          Status: <b>{order.status}</b>
        </div>
        <div>
          {order.orderProducts.length} {order.orderProducts.length > 1 ? "products" : "product"}
        </div>
        <div>${order.value.toFixed(2)}</div>
        <div className="order-item-button-wrapper">
          <Link href={`/order/${order._id}`}>
            <Button className="text-sm">View details</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
