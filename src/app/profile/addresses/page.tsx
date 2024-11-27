import PrivateRoute from "@/app/PrivateRoute";
import AddressOverview from "@/components/addresses/addressOverview/AddressOverview";

export default function UserAddressesPage() {
  return (
    <PrivateRoute>
      <AddressOverview />
    </PrivateRoute>
  );
}
