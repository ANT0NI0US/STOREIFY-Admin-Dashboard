import OrdersTable from "@/components/orders/OrdersTable";
import PageHead from "@/ui/PageHead";
import useHelmet from "@/hooks/useHelmet";

export default function Orders() {
  useHelmet("Orders");

  return (
    <>
      <PageHead headText="Orders" />
      <OrdersTable />
    </>
  );
}
