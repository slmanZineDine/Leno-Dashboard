// Third-Party =====> React-Router
import { Link } from "react-router-dom";
// Third-Party =====> React-i18next
import { useTranslation } from "react-i18next";
// My-Components
import Can from "@components/guard/Can";
import Table from "@components/common/tables/Table";
import InputField from "@components/common/Input/InputField";
import Pagination from "@components/common/pagination/Pagination";
import TableRowList from "@components/common/tableRows/TableRowList";
import StatisticBox from "@components/common/statistics/StatisticBox";
import HeadingSection from "@components/common/sections/HeadingSection";
import Supervisor from "@components/dashboard/admin/supervisors/Supervisor";
// My-Hooks
import useDataFiltering from "@hooks/useDataFiltering";
// Icons
import { IoPersonAdd } from "react-icons/io5";
import { FaUserCheck, FaUserMinus } from "react-icons/fa6";
// Constants
import { PAGE_SIZE } from "constants/constants";
// Data
import { paths } from "@routes/paths";
import { SUPERVISORS } from "@data/index";
import { pathTitleMap } from "@routes/pathTitleMap";

const Supervisors = () => {
  // ################### LOCALES ###################
  const { t } = useTranslation();

  // ################### CUSTOM HOOKS ###################
  const {
    filteredData: slicedSupervisors,
    currentPage,
    setCurrentPage,
    handleSearch,
    totalCount,
  } = useDataFiltering({
    data: SUPERVISORS,
    searchPath: "productName",
  });

  // ################### CONTENT ###################
  const tableHeader = [
    {
      id: 1,
      title: "Name",
      isShow: true,
      styling: {
        textAlign: "start",
        paddingInlineStart: "1.5rem",
        width: "24%",
      },
    },
    { id: 2, title: "Phone", isShow: true },
    { id: 3, title: "Country", isShow: true },
    { id: 4, title: "Status", isShow: true },
    { id: 5, title: "", isShow: true },
  ];

  return (
    <>
      {/* ========================== Main Heading ========================== */}
      <HeadingSection title={t(pathTitleMap["supervisors"])} />

      {/* ========================== Statistics ========================== */}
      <Can action="view" name="statistics">
        <section className="4xl:grid-cols-2 container mb-8 grid grid-cols-1 gap-6">
          <StatisticBox
            title="Active"
            count={3}
            icon={<FaUserCheck />}
            bgColor="#4ade80"
          />
          <StatisticBox
            title="Bannded"
            count={0}
            icon={<FaUserMinus />}
            bgColor="#f87171"
          />
        </section>
      </Can>

      {/* ========================== Content ========================== */}
      <section className="container">
        {/* ========================== Filter ========================== */}
        <div className="flex-between max-cxl:flex-col mb-8 gap-4">
          <InputField
            type="search"
            label={t("common.searchBy", { label: t("common.supervisorName") })}
            placeholder={t("common.supervisorName")}
            inputClassName="input-field"
            containerClassName="w-full"
            isRequired={false}
            onChange={handleSearch}
          />
          <Can action="create" name="supervisors">
            <Link
              className="flex-center bg-primary hover:bg-primary-darker max-clg:w-full max-cxl:w-full gap-2 rounded-lg px-4 py-2 text-white"
              to={paths.supervisors.addSupervisor}
            >
              <IoPersonAdd className="text-xl" />
              {t(pathTitleMap["add-supervisor"])}
            </Link>
          </Can>
        </div>

        {/* ========================== Table ========================== */}
        <Table
          tableHeader={tableHeader}
          minWidth="min-w-[700px]"
          coverClassName="mt-6"
        >
          <TableRowList
            records={slicedSupervisors}
            renderItem={(record) => <Supervisor {...record} />}
            isLoading={false}
            colCount={tableHeader.length}
            noRecordMsg={t("supervisors.noSupervisors")}
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

export default Supervisors;
