import { ordersFireBase, TopCustomer } from "@/utils/types";

export const getTop4Customers = (orders: ordersFireBase[]): TopCustomer[] => {
  const customerMap = new Map<string, TopCustomer>();

  orders.forEach((order) => {
    const key = order.userId;

    if (customerMap.has(key)) {
      const existing = customerMap.get(key)!;
      existing.totalSpent += order.itemsAmount || 0;
    } else {
      customerMap.set(key, {
        id: order.userId,
        name: order.name,
        userPhoto: order.userPhoto,
        totalSpent: order.itemsAmount || 0,
        email: order.email,
      });
    }
  });

  const sorted = Array.from(customerMap.values())
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, 4);

  return sorted;
};
