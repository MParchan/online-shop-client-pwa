import OrderCheckout from "@/components/orders/orderCheckout/OrderCheckout";
import PrivateRoute from "../PrivateRoute";

export default function OrderCheckoutPage() {
  return (
    <PrivateRoute>
      <OrderCheckout />
    </PrivateRoute>
  );
}
