// React
import { useEffect, useState } from "react";
// My-Components
import LoadingSpinner from "@components/common/Loading/LoadingSpinner";
// My-Hooks
import useOutsideClick from "@hooks/common/useOutsideClick";
// Icons
import { IoIosArrowDown } from "react-icons/io";

/** ----------------------------------------------
 * @description This component creates a custom select dropdown with the following features:
 *               1. Option selection: Allows the user to select an option from the dropdown.
 *               2. Option search: Provides a search functionality to find an option quickly.
 * @param {String} initialValue - The default value displayed when no option is selected.
 * @param {Object} selectedValue - Represents the currently selected value.
 * @param {Function} onOptionSelect - Updates the value with the selected option's data.
 * @param {Array} options - Array of objects, each representing an option to be displayed.
 * @param {Object} optionLabels - Contains keys for the value and displayValue for options.
 * @param {String} noOptionsMsg - Message to display when no options are available.
 * @param {Boolean} isFetching - Indicates if options are being loaded.
 * @param {String} customClassName - Class names for the container.
 * @param {String} selectClassName - Class names for the dropdown selector.
 -------------------------------------------------*/

type TSingleSelectProps<T> = {
  initialValue?: string; // Default: "اضغط هنا للاختيار"
  selectedValue?: string | null; // Selected option's display value
  value?: string | number | null;
  onOptionSelect: (option: T) => void; // Callback when an option is selected
  options: T[]; // List of options to display
  optionLabels: { value: string; displayValue: string }; // Keys for value and displayValue
  noOptionsMsg?: string; // Default: "لا يوجد بيانات."
  isFetching?: boolean; // Default: false
  customClassName?: string; // Additional class for container
  selectClassName?: string; // Additional class for dropdown selector
};

const SingleSelect = <T,>({
  initialValue = "اضغط هنا للاختيار",
  selectedValue = null,
  onOptionSelect,
  options = [],
  optionLabels,
  noOptionsMsg,
  isFetching = false,
  customClassName = "",
  selectClassName = "",
}: TSingleSelectProps<T>) => {
  // ################### REACT HOOKS ###################
  const [selectedOption, setSelectedOption] = useState<string>("");

  // ################### CUSTOM HOOKS ###################
  const [isOpen, setIsOpen, containerElement] = useOutsideClick();

  // ################### DATA ###################
  const msg = noOptionsMsg ? noOptionsMsg : "لا يوجد بيانات.";

  // ################### HANDLER ###################
  // ===== SELECT OPTION =====
  const handleSelectOption = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    option: any,
  ) => {
    event.stopPropagation();
    setSelectedOption(option[optionLabels.displayValue] as string);
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
      className={`relative cursor-pointer ${customClassName}`}
      ref={containerElement}
    >
      <div
        className={`flex-between bg-input-bg h-[30px] gap-4 rounded-md text-gray-400 focus:outline-hidden dark:text-white ${selectClassName}`}
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
      >
        <h2 className="line-clamp-1">
          {selectedOption ? selectedOption : initialValue}
        </h2>
        <div className="flex-center -me-2 h-full w-10 border-s-2 border-s-[#d8d8d8]">
          <IoIosArrowDown
            className={`shrink-0 text-xl transition-all duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
          />
        </div>
      </div>
      <ul
        className={`border-button text-text bg-box-bg absolute top-[110%] z-10 w-full overflow-y-auto rounded-md border-[#d8d8d8] transition-[max-height] duration-500 dark:text-white ${
          isOpen ? "max-h-40 border" : "max-h-0 border-none"
        }`}
      >
        {options.length > 0
          ? options?.map((option: any) => (
              <li
                key={option?.[optionLabels.value]}
                className={`px-4 py-2 transition-all duration-150 hover:bg-[#76cad4] hover:text-black ${
                  selectedOption === option?.[optionLabels.displayValue]
                    ? "bg-[#76cad4] text-black"
                    : ""
                }`}
                onClick={(e) => handleSelectOption(e, option)}
              >
                {option?.[optionLabels.displayValue]}
              </li>
            ))
          : !isFetching && (
              <li className="px-4 py-2 text-center text-red-600">{msg}</li>
            )}
        {isFetching && (
          <li className="flex-center cursor-not-allowed px-4 py-2">
            <LoadingSpinner size="loading-md" color="text-primary" />
          </li>
        )}
      </ul>
    </div>
  );
};

export default SingleSelect;
