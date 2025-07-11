import { ReactElement } from "react";
import AddProductForm from "./AddProductForm";
import Modal from "@/ui/Modal";
import { newProductProps } from "@/utils/types";

interface AddEditProductProps {
  children: ReactElement;
  productToEdit?: newProductProps;
}

export default function AddEditProduct({
  children,
  productToEdit,
}: AddEditProductProps) {
  return (
    <Modal>
      <Modal.Open opens="addEditNewProduct">{children}</Modal.Open>

      <Modal.Window name="addEditNewProduct">
        <AddProductForm productToEdit={productToEdit} />
      </Modal.Window>
    </Modal>
  );
}
