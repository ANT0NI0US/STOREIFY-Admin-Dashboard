import { useSelector } from "react-redux";
import { getTop4Customers } from "./getTop4Customers";
import Top4CustomersTableRow from "./Top4CustomersTableRow";
import Spinner from "@/ui/spinner/Spinner";
import Table from "@/ui/Table";
import { orderState } from "@/utils/types";

const tableHeadCells = ["Profile", "email", "Product"];

export default function Top4CustomersTable() {
  const { allOrders, isLoading } = useSelector(
    (state: orderState) => state.order,
  );

  const topCustomers = getTop4Customers(allOrders);

  return (
    <div className="bg-primary-light-color dark:bg-primary-dark-color rounded-md p-2 md:col-span-4 md:p-5">
      <h1 className="mb-2 text-2xl font-semibold">Top Seller</h1>
      {isLoading ? (
        <Spinner height="h-[50dvh]" />
      ) : (
        <Table>
          <Table.Header>
            {tableHeadCells.map((headCell, index) => (
              <Table.Cell key={index} isHeader headerHeight="min-h-[40px]">
                {headCell}
              </Table.Cell>
            ))}
          </Table.Header>
          <Table.Body
            data={topCustomers}
            render={(customer) => (
              <Top4CustomersTableRow customer={customer} key={customer?.id} />
            )}
          />
        </Table>
      )}
    </div>
  );
}
