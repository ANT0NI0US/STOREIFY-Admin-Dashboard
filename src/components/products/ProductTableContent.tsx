import { FaRegEdit } from "react-icons/fa";
import ShowProduct from "./ShowProduct";
import AddEditProduct from "./AddNewProduct";
import DeleteProduct from "./DeleteProduct";
import Button from "@/ui/Button";
import Table from "@/ui/Table";
import { newProductProps } from "@/utils/types";

interface Props {
  product: newProductProps;
}

export default function ProductTableContent({ product }: Props) {
  const { id, productName, category, price, imgUrl } = product;

  return (
    <Table.Row key={id}>
      <Table.Cell>
        <img
          loading="lazy"
          src={typeof imgUrl === "string" ? imgUrl : undefined}
          alt={productName}
          className="h-16 max-h-full w-16 max-w-full object-contain object-center sm:h-24 sm:w-24 lg:h-32 lg:w-32"
        />
      </Table.Cell>
      <Table.Cell>{productName}</Table.Cell>
      <Table.Cell>{category}</Table.Cell>
      <Table.Cell>${price}</Table.Cell>
      <Table.Cell>
        <div className="flex gap-2">
          <ShowProduct product={product} />
          <AddEditProduct productToEdit={product}>
            <Button
              AriaLabel="Edit Product"
              variation="secondary"
              size="actions"
              Font="!w-10"
            >
              <FaRegEdit />
            </Button>
          </AddEditProduct>
          <DeleteProduct product={product} />
        </div>
      </Table.Cell>
    </Table.Row>
  );
}
