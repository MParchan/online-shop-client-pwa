import { Opinion } from "@/types/models/opinion.types";

export const averageRating = (opinions: Opinion[]): number => {
    if (opinions.length === 0) return 0;

    const totalRating = opinions.reduce((acc, opinion) => acc + opinion.rating, 0);
    const average = totalRating / opinions.length;
    return Math.round(average * 10) / 10;
};
