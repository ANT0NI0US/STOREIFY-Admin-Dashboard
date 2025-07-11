import { isDateInThePast } from "@/utils/helpers";
import { ordersFireBase } from "@/utils/types";

type OrderStats = {
  deliveredPercent: number;
  pendingPercent: number;
};

export const getOrderStats = (orders: ordersFireBase[]): OrderStats => {
  const total = orders.length;
  let deliveredCount = 0;

  orders.forEach((order) => {
    if (isDateInThePast(order.deliveryDate)) {
      deliveredCount++;
    }
  });

  const pendingCount = total - deliveredCount;

  const deliveredPercent =
    total > 0 ? Math.round((deliveredCount / total) * 100) : 0;
  const pendingPercent =
    total > 0 ? Math.round((pendingCount / total) * 100) : 0;

  return {
    deliveredPercent,
    pendingPercent,
  };
};
