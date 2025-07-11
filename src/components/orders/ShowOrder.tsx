import { TbListDetails } from "react-icons/tb";
import OrderDetails from "./OrderDetails";
import Modal from "@/ui/Modal";
import Button from "@/ui/Button";
import { ordersFireBase } from "@/utils/types";

interface ShowOrderProps {
  order: ordersFireBase;
}

export default function ShowOrder({ order }: ShowOrderProps) {
  return (
    <Modal>
      <Modal.Open opens="orderDetails">
        <Button AriaLabel="Show Product" variation="secondary" size="actions">
          <TbListDetails />
        </Button>
      </Modal.Open>
      <Modal.Window name="orderDetails">
        <OrderDetails order={order} />
      </Modal.Window>
    </Modal>
  );
}
