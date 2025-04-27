// Third-Party =====> i18next
import { useTranslation } from "react-i18next";
// My-Components
import Table from "@components/common/tables/Table";
import Category from "@components/dashboard/category";
import BoxHeader from "@components/common/box/BoxHeader";
import InputField from "@components/common/Input/InputField";
import Pagination from "@components/common/pagination/Pagination";
import TableRowList from "@components/common/tableRows/TableRowList";
import AddCategory from "@components/dashboard/category/AddCategory";
import HeadingSection from "@components/common/sections/HeadingSection";
// My-Hooks
import useDataFiltering from "@hooks/useDataFiltering";
// API
import { useGetCategoriesQuery } from "@redux/services/products/productsApiSlice";
// Icons
import { CgSearch } from "react-icons/cg";
import { BiSolidCategoryAlt } from "react-icons/bi";
// Data
import { PAGE_SIZE } from "constants/constants";
import { pathTitleMap } from "@routes/pathTitleMap";

const Categories = () => {
  // ################### RTK QUERY ###################
  // ===== GET =====
  const { data: categories, isFetching } = useGetCategoriesQuery();

  // ################### LOCALES ###################
  const { t } = useTranslation();

  // ################### CUSTOM HOOKS ###################
  const {
    filteredData: slicedCategories,
    currentPage,
    setCurrentPage,
    handleSearch,
    totalCount,
  } = useDataFiltering({
    data: categories || [],
    searchPath: "name",
  });

  // ################### CONTENT ###################
  const tableHeader = [
    { id: 1, title: t("tables.number"), isShow: true },
    { id: 2, title: t("tables.name"), isShow: true },
    { id: 3, title: "", isShow: true },
  ];

  return (
    <>
      {/* ========================== Main Heading ========================== */}
      <HeadingSection title={t([pathTitleMap["categories"]])} />

      {/* ========================== Add New Category ========================== */}
      <AddCategory />

      {/* ========================== Content ========================== */}
      <section className="container mt-12">
        <BoxHeader
          title={t("categories.categoryList")}
          icon={<BiSolidCategoryAlt className="text-heading text-2xl" />}
        />

        {/* ========================== Filter ========================== */}
        <div className="flex-between cxl:flex-row mb-8 flex-col gap-4">
          <InputField
            type="search"
            label={t("common.searchBy", { label: t("common.category") })}
            placeholder={t("common.category")}
            icon={<CgSearch />}
            inputClassName="input-field"
            containerClassName="max-cxl:w-full w-60"
            onChange={handleSearch}
            isRequired={false}
          />
        </div>

        {/* ========================== Table of Content ========================== */}
        <Table
          tableHeader={tableHeader}
          minWidth="min-w-[700px]"
          coverClassName="mt-6"
        >
          <TableRowList
            records={slicedCategories}
            renderItem={(record, index) => (
              <Category
                name={record.name}
                index={index + (currentPage - 1) * 10}
              />
            )}
            isLoading={isFetching}
            colCount={tableHeader.length}
            noRecordMsg={t("categories.noCategories")}
          />
        </Table>

        {/* ========================== Pagination ========================== */}
        <Pagination
          currentPage={currentPage}
          totalCount={totalCount}
          pageSize={PAGE_SIZE}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      </section>
    </>
  );
};

export default Categories;
