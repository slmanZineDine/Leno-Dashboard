// React
import { lazy, Suspense, useState } from "react";
// Third-Party =====> react-i18next
import { useTranslation } from "react-i18next";
// My-Components
import Table from "@components/common/tables/Table";
import BoxHeader from "@components/common/box/BoxHeader";
import InputField from "@components/common/Input/InputField";
import OrderRow from "@components/dashboard/orders/OrderRow";
import Pagination from "@components/common/pagination/Pagination";
import ModelSkeleton from "@components/common/Loading/ModelSkeleton";
import TableRowList from "@components/common/tableRows/TableRowList";
import FilterSection from "@components/common/filters/FilterSection";
// My-Hooks
import useDataFiltering from "@hooks/useDataFiltering";
// Icons
import { IoCart } from "react-icons/io5";
// Data
import { ORDERS } from "@data/index";
// Constants
import { PAGE_SIZE } from "constants/constants";
import { OrderStatus, TOrderStatusValues } from "constants/enums";
// Types
import type { TOrder } from "@customTypes/order";

// Dynamic Import
const CancelOrderModal = lazy(
  () => import("@components/dashboard/orders/CancelOrderModal"),
);

const OrdersTable = () => {
  // ################### LOCALES ###################
  const { t } = useTranslation();

  // ################### REACT HOOKS ###################
  const [selectedOrderStatus, setSelectedOrderStatus] = useState<
    TOrderStatusValues | ""
  >("");
  const [order, setOrder] = useState<TOrder>();
  const [showBookingModel, setShowBookingModel] = useState(false);

  // ################### CUSTOM HOOKS ###################
  const {
    filteredData: slicedOrders,
    currentPage,
    setCurrentPage,
    handleSearch,
    totalCount,
  } = useDataFiltering({
    data: ORDERS,
    searchPath: "productName",
    filterFn: selectedOrderStatus
      ? (order) => order.status === selectedOrderStatus
      : undefined,
  });

  // ################### CONTENT ###################
  const tableHeader = [
    { id: 1, title: t("tables.product"), isShow: true },
    { id: 2, title: t("tables.customer"), isShow: true },
    { id: 3, title: t("tables.status"), isShow: true },
    { id: 4, title: t("tables.date"), isShow: true },
    { id: 5, title: t("tables.quantity"), isShow: true },
    { id: 6, title: t("tables.price"), isShow: true },
    { id: 7, title: t("tables.total"), isShow: true },
    { id: 8, title: "", isShow: true },
  ];

  return (
    <>
      {/* ========================== Content ========================== */}
      <section className="container mt-12">
        <BoxHeader
          title={t("orders.orderList")}
          icon={<IoCart className="text-heading text-2xl" />}
        />

        {/* ========================== Search ========================== */}
        <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
          <InputField
            type="search"
            label={t("common.searchBy", { label: t("common.productName") })}
            placeholder={t("common.productName")}
            inputClassName="input-field"
            containerClassName="w-full"
            isRequired={false}
            onChange={handleSearch}
          />
        </div>

        {/* ========================== Filters ========================== */}
        <FilterSection
          filters={Object.values(OrderStatus)}
          selectedFilter={selectedOrderStatus}
          onFilterChange={setSelectedOrderStatus}
          className="mb-4"
        />

        {/* ========================== Table of Content ========================== */}
        <Table
          tableHeader={tableHeader}
          minWidth="min-w-[750px] table-auto!"
          coverClassName="mt-6"
        >
          <TableRowList
            records={slicedOrders}
            renderItem={(record) => (
              <OrderRow
                {...record}
                handleStoreOrder={setOrder}
                handleOpenCancelModal={setShowBookingModel}
              />
            )}
            colCount={tableHeader.length}
            noRecordMsg={t("orders.noOrders")}
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

      {/* ========================== Modals ========================== */}
      <Suspense fallback={<ModelSkeleton />}>
        {showBookingModel && order && (
          <CancelOrderModal
            onModelClose={() => setShowBookingModel(false)}
            order={order}
          />
        )}
      </Suspense>
    </>
  );
};

export default OrdersTable;
