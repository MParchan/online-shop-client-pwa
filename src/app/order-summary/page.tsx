import PrivateRoute from "../PrivateRoute";
import OrderSummary from "@/components/orders/orderSummary/OrderSummary";

export default function OrderSummaryPage() {
  return (
    <PrivateRoute>
      <OrderSummary />
    </PrivateRoute>
  );
}
