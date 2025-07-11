import { ordersFireBase } from "@/utils/types";

type ProductCount = {
  productName: string;
  count: number;
};

export const getTop5Products = (orders: ordersFireBase[]): ProductCount[] => {
  const productMap = new Map<string, number>();

  orders.forEach((order) => {
    order.items.forEach((item) => {
      const name = item.productName;
      const quantity = item.quantity || 1;

      if (productMap.has(name)) {
        productMap.set(name, productMap.get(name)! + quantity);
      } else {
        productMap.set(name, quantity);
      }
    });
  });

  const sortedProducts = Array.from(productMap.entries())
    .map(([productName, count]) => ({ productName, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return sortedProducts;
};
