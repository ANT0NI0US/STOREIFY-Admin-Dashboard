import ModalBody from "@/ui/ModalBody";
import Information from "@/ui/Information";
import { newProductProps } from "@/utils/types";

interface ProductDetailsProps {
  product: newProductProps;
  onCloseModal?: () => void;
}

export default function ProductDetails({
  product,
  onCloseModal,
}: ProductDetailsProps) {
  const { productName, category, price, avgRating, description, imgUrl } =
    product;

  return (
    <ModalBody type="div">
      <ModalBody.Header title="Product Details" />
      <ModalBody.Body>
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-8 md:gap-5">
          <div className="flexCenter sm:col-span-4">
            <img
              loading="lazy"
              src={typeof imgUrl === "string" ? imgUrl : undefined}
              alt={productName}
              className="size-60 max-h-full max-w-full object-contain object-center sm:size-72"
            />
          </div>

          <div className="flex flex-col gap-3.5 sm:col-span-4 md:gap-5">
            <Information text="Name" value={productName} />
            <Information text="Category" value={category} />
            <Information text="Price" value={`${price}$`} />
            <Information text="Average Rating" value={avgRating} />
          </div>
        </div>
        <Information text="Description" value={description} />
      </ModalBody.Body>

      <ModalBody.Footer onCancel={onCloseModal} />
    </ModalBody>
  );
}
