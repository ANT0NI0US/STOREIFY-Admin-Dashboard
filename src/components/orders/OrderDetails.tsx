import ModalBody from "@/ui/ModalBody";
import OrderDetailsInfo from "./OrderDetailsInfo";
import OrderItems from "./OrderItems";
import { ordersFireBase } from "@/utils/types";

interface OrderDetailsProps {
  order: ordersFireBase;
  onCloseModal?: () => void;
}

export default function OrderDetails({
  order,
  onCloseModal,
}: OrderDetailsProps) {
  const { userPhoto, items, name, phone, email, address, city, code, country } =
    order;

  return (
    <ModalBody type="div">
      <ModalBody.Header title="Order Details" />
      <ModalBody.Body>
        <OrderItems items={items} />

        <OrderDetailsInfo
          name={name}
          phone={phone}
          email={email}
          address={address}
          city={city}
          code={code}
          country={country}
          userPhoto={userPhoto}
        />
      </ModalBody.Body>
      <ModalBody.Footer onCancel={onCloseModal} />
    </ModalBody>
  );
}
