import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import ShowOrder from "./ShowOrder";
import Table from "@/ui/Table";
import { ordersFireBase } from "@/utils/types";
import { isDateInThePast } from "@/utils/helpers";

interface Props {
  order: ordersFireBase;
}

export default function OrderTableContent({ order }: Props) {
  const {
    id,
    userPhoto,
    name,
    email,
    itemsAmount,
    orderDate,
    address,
    city,
    country,
  } = order;

  return (
    <Table.Row key={id}>
      <Table.Cell>
        <div className="flex items-center gap-3">
          <img
            loading="lazy"
            src={typeof userPhoto === "string" ? userPhoto : undefined}
            alt={name}
            className="size-10 max-h-full max-w-full rounded-full object-cover object-center"
          />
          <div className="flex flex-col items-start gap-1">
            <span className="capitalize">{name}</span>
            <span>{email}</span>
          </div>
        </div>
      </Table.Cell>
      <Table.Cell>
        <span className="capitalize">
          {address}, {city}, {country}
        </span>
      </Table.Cell>
      <Table.Cell>${itemsAmount}</Table.Cell>
      <Table.Cell>{orderDate}</Table.Cell>
      <Table.Cell>
        {isDateInThePast(order.deliveryDate) ? (
          <div className="bg-text-light-color dark:bg-text-dark-color rounded-full p-2">
            <FaCheck className="text-secondary-light-color dark:text-secondary-dark-color" />
          </div>
        ) : (
          <div className="bg-error-light-color dark:bg-error rounded-full p-2">
            <FaXmark className="text-secondary-light-color dark:text-secondary-dark-color" />
          </div>
        )}
      </Table.Cell>
      <Table.Cell>
        <ShowOrder order={order} />
      </Table.Cell>
    </Table.Row>
  );
}
