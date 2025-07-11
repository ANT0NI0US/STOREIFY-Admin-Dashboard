import Table from "@/ui/Table";
import { TopCustomer } from "@/utils/types";

interface Top4CustomersTableRowProps {
  customer: TopCustomer;
}

export default function Top4CustomersTableRow({
  customer,
}: Top4CustomersTableRowProps) {
  const { id, userPhoto, name, email, totalSpent } = customer;

  return (
    <Table.Row key={id}>
      <Table.Cell colHeight="min-h-[70px]">
        <div className="flex items-center gap-3">
          <img
            loading="lazy"
            src={typeof userPhoto === "string" ? userPhoto : undefined}
            alt={name}
            className="size-8 max-h-full max-w-full rounded-full object-cover object-center"
          />
          <div className="flex flex-col items-start gap-1">
            <span className="capitalize">{name}</span>
          </div>
        </div>
      </Table.Cell>
      <Table.Cell colHeight="min-h-[70px]">{email}</Table.Cell>
      <Table.Cell colHeight="min-h-[70px]">${totalSpent}</Table.Cell>
    </Table.Row>
  );
}
