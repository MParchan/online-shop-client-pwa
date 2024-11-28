import PrivateRoute from "@/app/PrivateRoute";
import OrderOverview from "@/components/orders/orderOverview/OrderOverview";

export default function UserOrdersPage() {
  return (
    <PrivateRoute>
      <OrderOverview />
    </PrivateRoute>
  );
}
