import PrivateRoute from "@/app/PrivateRoute";
import OrderOverview from "@/components/orders/orderOverview/OrderOverview";

export default function AdminOrdersPage() {
  return (
    <PrivateRoute isAdmin={true}>
      <OrderOverview isAdmin={true} />
    </PrivateRoute>
  );
}
