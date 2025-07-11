import { orderState } from "@/utils/types";
import { useSelector } from "react-redux";
import { getOrderStats } from "./getOrderStats";
import Charts from "./Charts";
import Spinner from "@/ui/spinner/Spinner";

export default function OrderStats() {
  const { allOrders, isLoading } = useSelector(
    (state: orderState) => state.order,
  );
  const { deliveredPercent, pendingPercent } = getOrderStats(allOrders);

  const donutData = [deliveredPercent, pendingPercent];
  const donutLabels = ["Delivered", "Pending"];

  return (
    <div className="bg-primary-light-color dark:bg-primary-dark-color min-h-[450px] rounded-md p-2 md:col-span-3 md:p-5">
      <h1 className="mb-2 text-2xl font-semibold">Order Status</h1>
      {isLoading ? (
        <Spinner height="h-[50dvh]" />
      ) : (
        <>
          <Charts data={donutData} labels={donutLabels} type="donut" />
        </>
      )}
    </div>
  );
}
