"use client";

import { useState } from "react";
import Image from "next/image";

interface SelectStarRatingProps {
  maxStars?: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
}

export default function SelectStarRating({ maxStars = 5, setRating }: SelectStarRatingProps) {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);

  const handleMouseEnter = (index: number) => {
    setHoveredRating(index);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  const handleClick = (index: number) => {
    setSelectedRating(index);
    if (setRating) {
      setRating(index);
    }
  };

  return (
    <div className="select-star-rating-wrapper">
      {[...Array(maxStars)].map((_, index) => {
        const starIndex = index + 1;
        return (
          <div
            key={index}
            className="group select-star-rating-star-wrapper"
            onMouseEnter={() => handleMouseEnter(starIndex)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(starIndex)}
          >
            <Image
              src={
                starIndex <= (hoveredRating || selectedRating)
                  ? "/assets/icons/star.svg"
                  : "/assets/icons/star_empty.svg"
              }
              alt="Star icon"
              width={32}
              height={32}
              className="select-star-rating-star-image group-hover:scale-125"
            />
          </div>
        );
      })}
    </div>
  );
}
