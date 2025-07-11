import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import ProductTableContent from "./ProductTableContent";
import FilterProducts from "./FilterProducts";
import PaginationControls from "./PaginationControls";
import Table from "@/ui/Table";
import Spinner from "@/ui/spinner/Spinner";
import Empty from "@/ui/Empty";
import { newProductProps, productState } from "@/utils/types";
import { PAGE_SIZE } from "@/utils/constants";
import { AppDispatch } from "@/store";
import { getProducts } from "@/store/service/productService";

const tableHeadCells = ["Image", "Title", "Category", "Price", "Actions"];

export default function ProductTable() {
  const dispatch = useDispatch<AppDispatch>();
  const [productsData, setProductData] = useState<newProductProps[]>([]);

  const [currentPage, setCurrentPage] = useState(1);

  const { isLoading, allProducts } = useSelector(
    (state: productState) => state.product,
  );

  const handleChangingProduct = useCallback(
    (newProductData: newProductProps[]) => {
      setCurrentPage(1);
      setProductData(newProductData);
    },
    [],
  );

  useEffect(() => {
    dispatch(getProducts())
      .unwrap()
      .then((allProducts) => {
        setProductData(allProducts);
      });
  }, [dispatch]);

  if (isLoading) return <Spinner height="h-[50dvh]" />;
  if (!productsData?.length) return <Empty title="No products found." />;

  const indexOfLastProduct = currentPage * PAGE_SIZE;
  const indexOfFirstProduct = indexOfLastProduct - PAGE_SIZE;
  const currentProducts = productsData.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );
  const totalPages = Math.ceil(productsData.length / PAGE_SIZE);

  return (
    <>
      <FilterProducts
        productsData={productsData}
        allProducts={allProducts}
        handleChangingProduct={handleChangingProduct}
      />
      <Table>
        <Table.Header>
          {tableHeadCells.map((headCell, index) => (
            <Table.Cell key={index} isHeader>
              {headCell}
            </Table.Cell>
          ))}
        </Table.Header>
        <Table.Body
          data={currentProducts}
          render={(product) => (
            <ProductTableContent product={product} key={product?.id} />
          )}
        />
        {totalPages > 1 && (
          <Table.Footer>
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              count={productsData.length}
              onPageChange={setCurrentPage}
            />
          </Table.Footer>
        )}
      </Table>
    </>
  );
}
