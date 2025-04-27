// Third-Party =====> react-i18next
import { useTranslation } from "react-i18next";
// My-Hooks
import { usePagination, DOTS } from "@hooks/pagination/usePagination";
// Icons
import { IoIosArrowBack } from "react-icons/io";
// Constants
import { Directions } from "constants/enums";

/** ----------------------------------------------
 * @description Pagination
 * @param {Function} onPageChange Callback function invoked with the updated page value when the page is changed.
 * @param {number} totalCount Represent the total count of data available from the source.
 * @param {number} siblingCount (optional) Represents the min number of page buttons to be shown on each side of the current page button. Defaults to 1.
 * @param {number} currentPage Represents the current active page.
 *                              We'll use a 1-based index instead of a traditional
 *                              0-based index for our currentPage value.
 * @param {number} pageSize Represents the maximum data are visible in a single page.
 * @returns {JSX}
 -------------------------------------------------*/

type TPaginationProps = {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
};

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}: TPaginationProps) => {
  // ################### LOCALES ###################
  const { t, i18n } = useTranslation();

  // ################### CUSTOM HOOKS ###################
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // ################### HANDLER ###################
  const onNext = () => onPageChange(currentPage + 1);
  const onPrevious = () => onPageChange(currentPage - 1);

  // ################### GLOBAL ###################
  let lastPage = paginationRange?.[paginationRange?.length - 1];
  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange?.length < 2 || !paginationRange) {
    return null;
  }

  return (
    <ul className="flex-center gap-x-2 py-4">
      <li
        title={t("buttons.previous")}
        className={`flex-center bg-input-bg size-8 rounded-full p-1 text-xl font-bold ${
          currentPage === 1
            ? "pointer-events-none cursor-not-allowed text-slate-500"
            : "cursor-pointer text-[#0f5a85] dark:text-white"
        }`}
        onClick={onPrevious}
      >
        <IoIosArrowBack
          className={`${i18n.dir(i18n.language) === Directions.RTL ? "rotate-180" : ""}`}
        />
      </li>
      {paginationRange?.map((pageNumber, i) => {
        if (pageNumber === DOTS)
          return (
            <li
              key={i}
              className="cursor-pointer p-2 text-xl font-bold dark:text-white"
            >
              …
            </li>
          );

        // Render our Page Pills
        return (
          <li
            className={`flex-center h-8 w-8 cursor-pointer rounded-full p-1 text-lg font-bold transition-all duration-300 dark:text-white ${
              pageNumber === currentPage ? "bg-primary text-white" : ""
            }`}
            key={i}
            onClick={() => onPageChange(pageNumber as number)}
          >
            {pageNumber}
          </li>
        );
      })}

      <li
        title={t("buttons.next")}
        className={`flex-center bg-input-bg size-8 rounded-full p-1 text-xl font-bold ${
          currentPage === lastPage
            ? "pointer-events-none cursor-not-allowed text-slate-500"
            : "cursor-pointer text-[#0f5a85] dark:text-white"
        }`}
        onClick={onNext}
      >
        <IoIosArrowBack
          className={`${i18n.dir(i18n.language) === Directions.RTL ? "" : "rotate-180"}`}
        />
      </li>
    </ul>
  );
};

export default Pagination;
