// React
import { useEffect, useState } from "react";
// Third-Party =====> React-Router
import { Link } from "react-router-dom";
// My-Components
import Can from "@components/guard/Can";
import Table from "@components/common/tables/Table";
import Product from "@components/dashboard/product";
import BoxHeader from "@components/common/box/BoxHeader";
import InputField from "@components/common/Input/InputField";
import Pagination from "@components/common/pagination/Pagination";
import TableRowList from "@components/common/tableRows/TableRowList";
import HeadingSection from "@components/common/sections/HeadingSection";
// My-Hooks
import useSeachKeyword from "@hooks/search/useSeachKeyword";
// API
import {
  useGetProductsQuery,
  useSearchProductQuery,
} from "@redux/services/products/productsApiSlice";
// Icons
import { GiShoppingBag } from "react-icons/gi";
// Data
import { paths } from "@routes/paths";
import { PAGE_SIZE } from "constants/constants";
import { pathTitleMap } from "@routes/pathTitleMap";
// Type
import type { TProductRes } from "@customTypes/response/response";

const Products = () => {
  // ################### REACT HOOKS ###################
  const [products, setProducts] = useState<TProductRes>();
  const [currentPage, setCurrentPage] = useState(1);

  // ################### CUSTOM HOOKS ###################
  const [searchkeyword, handleChangeName] = useSeachKeyword();

  // ################### RTK QUERY ###################
  // ===== GET =====
  const { data: allProducts, isFetching } = useGetProductsQuery(currentPage, {
    skip: !!searchkeyword,
  });
  const { data: filteredProducts, isFetching: isSearching } =
    useSearchProductQuery(
      {
        page: currentPage,
        searchValue: searchkeyword,
      },
      {
        skip: !searchkeyword,
      },
    );

  // ################### SIDE EFFECT ###################
  useEffect(() => {
    setCurrentPage(1);
    if (!!searchkeyword) {
      setProducts(filteredProducts);
    } else {
      setProducts(allProducts);
    }
  }, [allProducts, filteredProducts, searchkeyword]);

  // ################### CONTENT ###################
  const tableHeader = [
    { id: 1, title: "Title", isShow: true },
    { id: 2, title: "Brand", isShow: true },
    { id: 3, title: "Category", isShow: true },
    { id: 4, title: "Price", isShow: true },
    { id: 5, title: "Rating", isShow: true },
    { id: 6, title: "", isShow: true },
  ];

  return (
    <>
      {/* ========================== Main Heading ========================== */}
      <HeadingSection title={pathTitleMap.products} />

      {/* ========================== Content ========================== */}
      <section className="container">
        <BoxHeader
          title="Products List"
          icon={<GiShoppingBag className="text-heading text-2xl" />}
        />

        {/* ========================== Filter ========================== */}
        <div className="flex-between cxl:flex-row mb-8 flex-col gap-4">
          <InputField
            type="search"
            label="Search by title:"
            isRequired={false}
            placeholder="Product title"
            inputClassName="input-field"
            containerClassName="max-cxl:w-full w-60"
            onChange={handleChangeName}
          />
          <Can action="create" name="products">
            <Link
              className="flex-center bg-primary hover:bg-primary-darker max-clg:w-full max-cxl:w-full gap-2 rounded-lg px-4 py-2 text-white"
              to={paths.products.addProduct}
            >
              <GiShoppingBag className="text-xl" />
              Add Product
            </Link>
          </Can>
        </div>

        {/* ========================== Table of Content ========================== */}
        <Table
          tableHeader={tableHeader}
          minWidth="min-w-[700px]"
          coverClassName="mt-6"
          isLoading={isFetching || isSearching}
        >
          <TableRowList
            records={products?.products ?? []}
            renderItem={(record) => <Product {...record} />}
            colCount={tableHeader.length}
            noRecordMsg="The are no products."
          />
        </Table>

        {/* ========================== Pagination ========================== */}
        <Pagination
          currentPage={currentPage}
          totalCount={products?.total ?? 0}
          pageSize={PAGE_SIZE}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      </section>
    </>
  );
};

export default Products;
