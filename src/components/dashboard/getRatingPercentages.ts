import { newProductProps } from "@/utils/types";

type RatingStats = Record<1 | 2 | 3 | 4 | 5, number>;

export const getRatingPercentages = (
  products: newProductProps[],
): RatingStats => {
  const counts: RatingStats = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  let totalRatings = 0;

  products.forEach((product) => {
    product.reviews?.forEach((review) => {
      const rating = review.rating as 1 | 2 | 3 | 4 | 5;
      if (rating >= 1 && rating <= 5) {
        counts[rating]++;
        totalRatings++;
      }
    });
  });

  if (totalRatings === 0) return counts;

  const ratings = [1, 2, 3, 4, 5] as const;

  ratings.forEach((rating) => {
    counts[rating] = Math.round((counts[rating] / totalRatings) * 100);
  });

  return counts;
};
