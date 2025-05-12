import PrivateRoute from "@/app/PrivateRoute";
import OrderDetails from "@/components/orders/orderDetails/OrderDetails";
import { Metadata } from "next";

interface OrderProps {
  params: { id: string };
}

export async function generateMetadata({ params }: OrderProps): Promise<Metadata> {
  return {
    title: `Order nr: ${params.id}`
  };
}

export default function OrderPage({ params }: OrderProps) {
  return (
    <PrivateRoute>
      <OrderDetails orderId={params.id} />
    </PrivateRoute>
  );
}
