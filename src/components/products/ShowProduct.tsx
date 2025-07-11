import { TbListDetails } from "react-icons/tb";
import Modal from "@/ui/Modal";
import Button from "@/ui/Button";
import ProductDetails from "./ProductDetails";
import { newProductProps } from "@/utils/types";

interface ShowProductProps {
  product: newProductProps;
}

export default function ShowProduct({ product }: ShowProductProps) {
  return (
    <Modal>
      <Modal.Open opens="productDetails">
        <Button AriaLabel="Show Product" variation="secondary" size="actions">
          <TbListDetails />
        </Button>
      </Modal.Open>
      <Modal.Window name="productDetails">
        <ProductDetails product={product} />
      </Modal.Window>
    </Modal>
  );
}
