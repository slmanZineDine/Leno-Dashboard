// Icons
import { forwardRef } from "react";
import { MdError } from "react-icons/md";

type TSelect = {
  label?: string;
  initailValue: string;
  options: { [key: string]: any }[];
  optionLabels: { value: string; displayValue: string };
  error?: any; // This type  { [key: string]: { message?: string } } occure an errorm so I use any just temp
  isRequired?: boolean;
  isLoading?: boolean;
  containerClassName?: string;
  selectedOption?: { value: number | string; displayValue: string };
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const SelectFieldset = forwardRef<HTMLSelectElement, TSelect>(
  (
    {
      label,
      initailValue,
      options = [],
      optionLabels,
      error = {},
      isRequired = true,
      isLoading = false,
      containerClassName = "",
      selectedOption,
      ...props
    },
    ref,
  ) => {
    // ################### DATA ###################
    const { value, displayValue } = optionLabels;

    // ################### SETTINGS ###################
    const hasErr = props?.name && error?.[props.name];
    let content;
    if (isLoading) {
      content = <option disabled>جاري التحميل ...</option>;
    } else if (options.length === 0 && typeof selectedOption === "undefined") {
      content = <option disabled>لا يوجد بيانات</option>;
    } else {
      content = options.map((option) => (
        <option key={option[value]} value={option[value]}>
          {option[displayValue]}
        </option>
      ));
    }

    return (
      <div className={`relative w-full ${containerClassName}`}>
        <fieldset
          className={`group focus-within:border-primary bg-input-bg rounded-lg border px-3 pb-2 ${hasErr ? "border-red-600" : "border-border"}`}
        >
          <legend
            className={`text-md text-text group-focus-within:text-primary px-2 ${
              isRequired ? "after:text-red-500 after:content-['*']" : ""
            }`}
          >
            {label}
          </legend>
          <select
            className="input-field text-md h-[30px] w-full rounded-xl border-none ps-2"
            ref={ref}
            {...props}
          >
            <option value="" disabled>
              {initailValue}
            </option>
            {selectedOption && (
              <option value={selectedOption.value}>
                {selectedOption.displayValue}
              </option>
            )}
            {content}
          </select>
        </fieldset>
        {hasErr && (
          <small className="absolute top-[102%] flex items-center gap-1 leading-none text-red-400">
            <MdError className="text-md mt-1 shrink-0 self-start" />{" "}
            {error[props.name as string].message}
          </small>
        )}
      </div>
    );
  },
);

export default SelectFieldset;
