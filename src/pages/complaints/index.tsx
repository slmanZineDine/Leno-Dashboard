// React
import { useState } from "react";
// Third-Party =====> i18next
import { useTranslation } from "react-i18next";
// My-Components
import Complaint from "@components/dashboard/complaint";
import Loading from "@components/common/Loading/Loading";
import InputField from "@components/common/Input/InputField";
import Pagination from "@components/common/pagination/Pagination";
import FilterSection from "@components/common/filters/FilterSection";
import HeadingSection from "@components/common/sections/HeadingSection";
// My-Hooks
import useDataFiltering from "@hooks/useDataFiltering";
// Data
import { COMPLAINTS } from "@data/index";
import { PAGE_SIZE } from "constants/constants";
import { pathTitleMap } from "@routes/pathTitleMap";
import { ComplaintStatus, TComplaintStatusValues } from "constants/enums";

const Complaints = () => {
  // ################### LOCALES ###################
  const { t } = useTranslation();

  // ################### REACT HOOKS ###################
  const [selectedComplaintStatus, setSelectedComplaintStatus] = useState<
    TComplaintStatusValues | ""
  >("");

  // ################### CUSTOM HOOKS ###################
  const {
    filteredData: slicedComplaints,
    currentPage,
    setCurrentPage,
    handleSearch,
    totalCount,
  } = useDataFiltering({
    data: COMPLAINTS,
    searchPath: "customer.name",
    filterFn: selectedComplaintStatus
      ? (complaint) => complaint.status === selectedComplaintStatus
      : undefined,
  });

  return (
    <>
      {/* ========================== Main Heading ========================== */}
      <HeadingSection title={t(pathTitleMap.complaints)} />

      {/* ========================== Loading ========================== */}
      <Loading isLoading={false}>
        {/* ========================== Filter ========================== */}
        <section className="container">
          {/* ========================== Search ========================== */}

          <InputField
            type="search"
            label={t("common.searchBy", { label: t("common.customerName") })}
            placeholder={t("common.customerName")}
            inputClassName="input-field"
            containerClassName="w-full mb-4"
            isRequired={false}
            onChange={handleSearch}
          />

          {/* ========================== Filters ========================== */}
          <FilterSection
            filters={Object.values(ComplaintStatus)}
            selectedFilter={selectedComplaintStatus}
            onFilterChange={setSelectedComplaintStatus}
            className="mb-8"
          />
        </section>
        {/* ========================== Content ========================== */}
        <section className="max-4xl:grid-cols-1 container grid grid-cols-2 gap-4">
          {slicedComplaints.map((complaint) => (
            <Complaint key={complaint.id} {...complaint} />
          ))}
        </section>

        {/* ========================== Pagination ========================== */}
        <Pagination
          currentPage={currentPage}
          totalCount={totalCount}
          pageSize={PAGE_SIZE}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      </Loading>
    </>
  );
};

export default Complaints;
