import { MdAddShoppingCart } from "react-icons/md";
import AddNewProduct from "@/components/products/AddNewProduct";
import ProductTable from "@/components/products/ProductTable";
import Button from "@/ui/Button";
import PageHead from "@/ui/PageHead";
import useHelmet from "@/hooks/useHelmet";

export default function Products() {
  useHelmet("Products");

  return (
    <>
      <PageHead headText="Products">
        <AddNewProduct>
          <Button AriaLabel="Add New Product" Font="w-[180px]!">
            <MdAddShoppingCart />
            <span>Add New Product</span>
          </Button>
        </AddNewProduct>
      </PageHead>

      <ProductTable />
    </>
  );
}
