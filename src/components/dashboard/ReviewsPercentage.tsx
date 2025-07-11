import { productState } from "@/utils/types";
import { useSelector } from "react-redux";
import { getRatingPercentages } from "./getRatingPercentages";
import Charts from "./Charts";
import Spinner from "@/ui/spinner/Spinner";

export default function ReviewsPercentage() {
  const { allProducts, isLoading } = useSelector(
    (state: productState) => state.product,
  );
  const ratingStats = getRatingPercentages(allProducts);

  const ratingLabels = ["Excellent", "Good", "Average", "Avg Below", "Poor"];
  const ratingData = [
    ratingStats[5],
    ratingStats[4],
    ratingStats[3],
    ratingStats[2],
    ratingStats[1],
  ];

  return (
    <div className="bg-primary-light-color dark:bg-primary-dark-color rounded-md p-2 md:col-span-4 md:p-5">
      <h1 className="mb-2 text-2xl font-semibold">Customer Reviews</h1>
      {isLoading ? (
        <Spinner height="h-[50dvh]" />
      ) : (
        <Charts type="line" data={ratingData} labels={ratingLabels} />
      )}
    </div>
  );
}
