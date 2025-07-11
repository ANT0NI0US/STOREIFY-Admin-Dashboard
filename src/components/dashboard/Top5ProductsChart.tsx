import { useSelector } from "react-redux";
import Charts from "./Charts";
import { getTop5Products } from "./getTop5Products";
import Spinner from "@/ui/spinner/Spinner";
import { orderState } from "@/utils/types";

export default function Top5ProductsChart() {
  const { allOrders, isLoading } = useSelector(
    (state: orderState) => state.order,
  );
  const topProducts = getTop5Products(allOrders);

  const labels = topProducts.map((p) => p.productName);
  const data = topProducts.map((p) => p.count);

  return (
    <div className="bg-primary-light-color dark:bg-primary-dark-color rounded-md p-2 md:col-span-5 md:p-5">
      <h1 className="text-2xl font-semibold">Top 5 Products Sells</h1>
      {isLoading ? (
        <Spinner height="h-[50dvh]" />
      ) : (
        <>
          <Charts data={data} labels={labels} type="bar" />
        </>
      )}
    </div>
  );
}
