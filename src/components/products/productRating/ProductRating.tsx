import { Opinion } from "@/types/models/opinion.types";
import { averageRating } from "@/utils/averageRating";
import Image from "next/image";

interface ProductRatingProps {
  opinions: Opinion[];
  quantity?: boolean;
}

export default function ProductRating({ opinions, quantity = true }: ProductRatingProps) {
  const rating = averageRating(opinions);
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(
        <span key={i}>
          <Image src="/assets/icons/star.svg" alt="Star icon" height={20} width={20} />
        </span>
      );
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      stars.push(
        <span key={i}>
          <Image src="/assets/icons/star_half.svg" alt="Star half icon" height={20} width={20} />
        </span>
      );
    } else {
      stars.push(
        <span key={i}>
          <Image src="/assets/icons/star_empty.svg" alt="Star empty icon" height={20} width={20} />
        </span>
      );
    }
  }
  return (
    <div className="flex">
      {stars}
      {quantity && (
        <div className="flex items-center text-gray-500 text-sm ml-1 mt-[1px]">
          ({opinions.length})
        </div>
      )}
    </div>
  );
}
