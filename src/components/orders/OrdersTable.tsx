import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderTableContent from "./OrderTableContent";
import Spinner from "@/ui/spinner/Spinner";
import Table from "@/ui/Table";
import { orderState } from "@/utils/types";
import { AppDispatch } from "@/store";
import { getOrders } from "@/store/service/ordersService";

const tableHeadCells = [
  "Customer Name",
  "Address",
  "Amount",
  "Date",
  "Status",
  "Actions",
];

export default function OrdersTable() {
  const dispatch = useDispatch<AppDispatch>();
  const { allOrders, isLoading } = useSelector(
    (state: orderState) => state.order,
  );

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  if (isLoading) return <Spinner height="h-[50dvh]" />;

  if (allOrders?.length === 0) {
    return (
      <h2 className="flexCenter mx-auto w-[90%] py-[80px] text-center text-xl font-semibold md:w-5/6">
        No Orders found.
      </h2>
    );
  }
  return (
    <Table>
      <Table.Header>
        {tableHeadCells.map((headCell, index) => (
          <Table.Cell key={index} isHeader>
            {headCell}
          </Table.Cell>
        ))}
      </Table.Header>
      <Table.Body
        data={allOrders}
        render={(order) => <OrderTableContent order={order} key={order?.id} />}
      />
    </Table>
  );
}
