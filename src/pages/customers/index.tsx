// React
import { useEffect, useState } from "react";
// Third-Party ====> React-Router
import { Link } from "react-router-dom";
// Third-Party =====> react-i18next
import { useTranslation } from "react-i18next";
// My-Components
import Can from "@components/guard/Can";
import Table from "@components/common/tables/Table";
import Customer from "@components/dashboard/customer";
import InputField from "@components/common/Input/InputField";
import Pagination from "@components/common/pagination/Pagination";
import TableRowList from "@components/common/tableRows/TableRowList";
import HeadingSection from "@components/common/sections/HeadingSection";
import UserStatusStatistics from "@components/common/statistics/UserStatusStatistics";
// My-Hooks
import useSeachKeyword from "@hooks/search/useSeachKeyword";
// API
import {
  useGetAllCustomersQuery,
  useSearchCustomersQuery,
} from "@redux/services/users/usersApiSlice";
// Icons
import { IoPersonAdd } from "react-icons/io5";
// Data
import { paths } from "@routes/paths";
import { PAGE_SIZE } from "constants/constants";
import { pathTitleMap } from "@routes/pathTitleMap";
// Utils
import type { TCustomerRes } from "@customTypes/response/response";
import BoxHeader from "@components/common/box/BoxHeader";
import { FaUsers } from "react-icons/fa6";

const Customers = () => {
  // ################### REACT HOOKS ###################
  const [customers, setCustomers] = useState<TCustomerRes>();
  const [currentPage, setCurrentPage] = useState(1);

  // ################### CUSTOM HOOKS ###################
  const [searchkeyword, handleChangeName] = useSeachKeyword();

  // ################### LOCALES ###################
  const { t } = useTranslation();

  // ################### RTK QUERY ###################
  // ===== GET =====
  const { data: allCustomers, isFetching } = useGetAllCustomersQuery(
    currentPage,
    { skip: !!searchkeyword },
  );
  const { data: filteredCustomers, isFetching: isSearching } =
    useSearchCustomersQuery(
      { page: currentPage, searchValue: searchkeyword },
      { skip: !searchkeyword },
    );

  // ################### SIDE EFFECT ###################
  useEffect(() => {
    setCurrentPage(1);
    if (!!searchkeyword) {
      setCustomers(filteredCustomers);
    } else {
      setCustomers(allCustomers);
    }
  }, [allCustomers, filteredCustomers, searchkeyword]);

  // ################### CONTENT ###################
  const tableHeader = [
    {
      id: 1,
      title: t("tables.name"),
      isShow: true,
      styling: {
        textAlign: "start",
        width: "24%",
      },
    },
    { id: 2, title: t("tables.phone"), isShow: true },
    { id: 3, title: t("tables.country"), isShow: true },
    { id: 4, title: "", isShow: true },
  ];

  return (
    <>
      {/* ========================== Main Heading ========================== */}
      <HeadingSection title={t(pathTitleMap["customers"])} />

      {/* ========================== Statistics ========================== */}
      <Can action="view" name="statistics">
        <section className="c2xl:grid-cols-2 container mb-8 grid grid-cols-1 gap-6">
          <UserStatusStatistics />
        </section>
      </Can>

      {/* ========================== Content ========================== */}
      <section className="container">
        <BoxHeader
          title={t("customers.customerList")}
          icon={<FaUsers className="text-heading text-2xl" />}
        />

        {/* ========================== filter ========================== */}
        <div className="flex-between max-cxl:flex-col mb-8 gap-4">
          <InputField
            type="search"
            label={t("common.searchBy", { label: t("common.customerName") })}
            isRequired={false}
            placeholder={t("common.customerName")}
            inputClassName="input-field"
            containerClassName="max-cxl:w-full w-60"
            onChange={handleChangeName}
          />
          <Can action="create" name="customers">
            <Link
              className="flex-center bg-primary hover:bg-primary-darker max-clg:w-full max-cxl:w-full gap-2 rounded-lg px-4 py-2 text-white"
              to={paths.customers.addCustomer}
            >
              <IoPersonAdd className="text-xl" />
              {t(pathTitleMap["add-customer"])}
            </Link>
          </Can>
        </div>

        {/* ========================== Table ========================== */}
        <Table
          tableHeader={tableHeader}
          minWidth="min-w-[600px]"
          coverClassName="mt-6"
          isLoading={isFetching || isSearching}
          noDataMsg={t("customers.noCustomers")}
        >
          <TableRowList
            records={customers?.users ?? []}
            renderItem={(record) => <Customer {...record} />}
            colCount={tableHeader.length}
          />
        </Table>

        {/* ========================== Pagination ========================== */}
        <Pagination
          currentPage={currentPage}
          totalCount={customers?.total ?? 0}
          pageSize={PAGE_SIZE}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      </section>
    </>
  );
};

export default Customers;
