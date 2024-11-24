import PrivateRoute from "@/app/PrivateRoute";
import OpinionOverview from "@/components/opinions/opinionOverview/OpinionOverview";

export default function UserOpinionsPage() {
  return (
    <PrivateRoute>
      <OpinionOverview />
    </PrivateRoute>
  );
}
