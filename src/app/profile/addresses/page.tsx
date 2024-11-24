import PrivateRoute from "@/app/PrivateRoute";
import ProfileNavigation from "@/components/profile/profileNavigation/ProfileNavigation";

export default function UserAddressesPage() {
  return (
    <PrivateRoute>
      <div className="flex w-full">
        <ProfileNavigation />
      </div>
    </PrivateRoute>
  );
}
