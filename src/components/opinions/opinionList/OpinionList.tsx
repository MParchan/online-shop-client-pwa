import { Opinion } from "@/types/models/opinion.types";
import OpinionItem from "./opinionItem/OpinionItem";

interface OpinionListProps {
  opinions: Opinion[];
}

export default function OpinionList({ opinions }: OpinionListProps) {
  return (
    <div className="opinion-list">
      {opinions.map((opinion: Opinion) => (
        <OpinionItem key={opinion._id} opinion={opinion} />
      ))}
    </div>
  );
}