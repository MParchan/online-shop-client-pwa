import ProfileNavigation from "@/components/profile/profileNavigation/ProfileNavigation";
import PrivateRoute from "../PrivateRoute";

export default function ProfilePage() {
  return (
    <PrivateRoute>
      <ProfileNavigation />
    </PrivateRoute>
  );
}
