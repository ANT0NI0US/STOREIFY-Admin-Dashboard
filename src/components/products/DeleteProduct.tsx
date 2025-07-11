import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { AiFillDelete } from "react-icons/ai";
import Modal from "@/ui/Modal";
import ConfirmMessage from "@/ui/ConfirmMessage";
import Button from "@/ui/Button";
import { newProductProps, productState } from "@/utils/types";
import { AppDispatch } from "@/store";
import { deleteProduct } from "@/store/service/productService";

interface Props {
  product: newProductProps;
}

export default function DeleteProduct({ product }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: productState) => state.product);

  const action = () => {
    if (product?.id && typeof product.imgUrl === "string") {
      dispatch(deleteProduct({ id: product.id, imgUrl: product.imgUrl }))
        .then(() => {
          toast.success("Product has been deleted successfully");
        })
        .catch(() => {
          toast.error("Something went wrong");
        });
    }
  };

  return (
    <Modal>
      <Modal.Open opens="productDeleteForm">
        <Button
          AriaLabel="Delete Product"
          variation="secondary"
          size="actions"
          Font="!w-10"
        >
          <AiFillDelete />
        </Button>
      </Modal.Open>
      <Modal.Window name="productDeleteForm">
        <ConfirmMessage
          message={`Are you sure you wanna to delete "${product?.productName}" ?`}
          onConfirm={action}
          disabled={isLoading}
        />
      </Modal.Window>
    </Modal>
  );
}
