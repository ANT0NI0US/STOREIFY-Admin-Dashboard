import Information from "@/ui/Information";
import ModalFormGrid from "@/ui/ModalFormGrid";
import { CartItem } from "@/utils/types";

interface Props {
  items: CartItem[];
}

export default function OrderItems({ items }: Props) {
  return (
    <div className="border-b-[0.5px] pb-3.5 md:pb-5">
      <h4 className="mb-3.5 text-2xl font-semibold md:mb-5">Items</h4>
      <ModalFormGrid>
        {items?.map((item: CartItem) => (
          <Information
            key={item.id}
            text={item.productName}
            value={`${item.quantity} with ${item.totalPrice}$`}
          />
        ))}
      </ModalFormGrid>
    </div>
  );
}
