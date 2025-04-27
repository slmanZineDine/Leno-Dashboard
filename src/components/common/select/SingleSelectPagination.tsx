// React
import { ChangeEvent, MouseEvent, UIEvent, useEffect, useState } from "react";
// My-Components
import LoadingSpinner from "@components/common/Loading/LoadingSpinner";
// My-Hooks
import useOutsideClick from "@hooks/common/useOutsideClick";
// Icons
import { IoIosArrowDown } from "react-icons/io";

type TSingleSelectPagination<T> = {
  initailValue?: string; // "اضغط هنا للاختيار"
  selectedValue?: string | null;
  onOptionSelect: (option: T) => void;
  options: T[];
  setOptions?: ((options: T[]) => void) | null;
  optionLabels: { value: string; displayValue: string };
  searchValue?: string; // Default: ""
  setSearchValue?: ((value: string) => void) | null;
  pagination: {
    pageCount: number;
    currentPage: number;
  };
  setPagination: (pagination: {
    pageCount: number;
    currentPage: number;
  }) => void;
  setIncludedPages: (arr: number[]) => void; // To Avoid Re-adding Existing data When Invalidating
  isFetching: boolean;
  isFilterMode?: boolean;
  noOptionsMsg?: string; // Default: "لا يوجد بيانات."
  containerClassName?: string; // Default: ""
  selectClassName?: string; // Default: ""
};

const SingleSelectPagination = <T,>({
  initailValue = "اضغط هنا للاختيار",
  selectedValue = null,
  onOptionSelect,
  options = [],
  setOptions = null,
  optionLabels,
  searchValue = "",
  setSearchValue = null,
  pagination,
  setPagination,
  setIncludedPages,
  isFetching,
  isFilterMode = false,
  noOptionsMsg = "لا يوجد بيانات.",
  containerClassName = "",
  selectClassName = "",
}: TSingleSelectPagination<T>) => {
  // ################### REACT HOOKS ###################
  const [selectedOption, setSelectedOption] = useState("");

  // ################### CUSTOM HOOKS ###################
  const [isOpen, setIsOpen, containerElement] = useOutsideClick();

  // ################### HANDLER ###################
  // ===== Pagination =====
  const handlePagination = (event: UIEvent<HTMLElement>) => {
    const { scrollTop, scrollHeight, offsetHeight } = event.currentTarget;
    const fullHeigth = scrollTop + offsetHeight;
    const { pageCount, currentPage } = pagination;

    if (fullHeigth >= scrollHeight && pageCount > currentPage && !isFetching) {
      setPagination({ ...pagination, currentPage: currentPage + 1 });
    }
  };

  // ===== Search =====
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (setSearchValue && setOptions) {
      setSearchValue(value);
      setOptions([]);
      setPagination({
        pageCount: value === "" ? pagination.pageCount : 0,
        currentPage: 1,
      });
      setIncludedPages([]);
    }
  };

  // ===== Option selection =====
  const handleSelectOption = (event: MouseEvent<HTMLElement>, option: any) => {
    event.stopPropagation();
    const displayValue =
      option === "all" ? "الكل" : option[optionLabels.displayValue];
    setSelectedOption(displayValue);
    onOptionSelect(option);
    setIsOpen(false);
  };

  // ################### SIDE EFFECT ###################
  useEffect(() => {
    if (selectedValue) setSelectedOption(selectedValue);
    else if (selectedValue === "") setSelectedOption("");
  }, [selectedValue]);

  return (
    <div
      className={`relative cursor-pointer ${containerClassName}`}
      ref={containerElement}
    >
      {/* ========================== Dropdown toggle ========================== */}
      <div
        className={`flex-between bg-input-bg h-[30px] gap-4 rounded-md text-gray-400 focus:outline-hidden dark:text-white ${selectClassName}`}
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
      >
        <h2 className="line-clamp-1">
          {selectedOption ? selectedOption : initailValue}
        </h2>
        <div className="flex-center -me-2 h-full w-10 border-s-2 border-s-[#d8d8d8]">
          <IoIosArrowDown
            className={`shrink-0 text-xl transition-all duration-200 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
      </div>

      {/* ========================== Dropdown list ========================== */}
      <ul
        className={`bg-box-bg text-text absolute top-[110%] z-10 w-full overflow-y-auto rounded-md border-[#d8d8d8] transition-[max-height] duration-500 dark:text-white ${
          isOpen ? "max-h-40 border" : "max-h-0 border-none"
        }`}
        onScroll={handlePagination}
      >
        {/* ========================== Search bar ========================== */}
        {setSearchValue && (
          <li className="px-2">
            <input
              type="search"
              className="input-field my-4 w-full rounded-md px-2 py-1"
              placeholder="بحث..."
              onInput={handleSearch}
            />
          </li>
        )}

        {/* ========================== No search results ========================== */}
        {!isFetching && searchValue && options.length === 0 && (
          <li className="px-4 py-4 text-center">
            {`لا يوجد نتائج بحث عن ${searchValue}.`}
          </li>
        )}

        {/* ========================== Filter mode ========================== */}
        {isFilterMode && !searchValue && (
          <li
            className={`px-4 py-2 transition-all duration-150 hover:bg-[#76cad4] hover:text-black ${
              selectedOption === "الكل" ? "bg-[#76cad4] text-black" : ""
            }`}
            onClick={(e) => handleSelectOption(e, "all")}
          >
            بلا
          </li>
        )}

        {/* ========================== Options ========================== */}
        {options.length > 0
          ? options.map((option: any) => (
              <li
                key={option[optionLabels.value]}
                className={`hover:bg-hover px-2 py-2 transition-all duration-150 ${
                  selectedOption === option[optionLabels.displayValue]
                    ? "bg-activeBg text-primary"
                    : ""
                }`}
                onClick={(e) => handleSelectOption(e, option)}
              >
                {option[optionLabels.displayValue]}
              </li>
            ))
          : !isFetching && (
              <li className="px-4 py-2 text-center text-red-600">
                {noOptionsMsg}
              </li>
            )}

        {/* ========================== Loading spinner ========================== */}
        {isFetching && (
          <li className="flex-center cursor-not-allowed px-4 py-2">
            <LoadingSpinner size="loading-md" color="text-primary" />
          </li>
        )}
      </ul>
    </div>
  );
};

export default SingleSelectPagination;
