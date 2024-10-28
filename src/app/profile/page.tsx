import PrivateRoute from "../PrivateRoute";

export default function ProfilePage() {
  return (
    <PrivateRoute>
      <div>Hello</div>
    </PrivateRoute>
  );
}
