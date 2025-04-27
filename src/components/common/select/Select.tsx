// Icons
import { MdError } from "react-icons/md";

type TSelect = {
  label?: string;
  initailValue: string;
  options: { [key: string]: any }[];
  optionLabels: { value: string; displayValue: string };
  className?: string;
  containerClassName?: string;
  selectContainerClassName?: string;
  error?: any; // This type  { [key: string]: { message?: string } } occure an errorm so I use any just temp
  isRequired?: boolean;
  isLoading?: boolean;
  selectedOption?: { value: number | string; displayValue: string };
  isSelectALL?: boolean;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const Select = ({
  label,
  className = "",
  containerClassName = "",
  selectContainerClassName = "",
  initailValue,
  options = [],
  optionLabels,
  error,
  isRequired = true,
  isLoading = false,
  selectedOption,
  isSelectALL = false,
  ...props
}: TSelect) => {
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
    <div className={containerClassName}>
      {label && (
        <label
          htmlFor={props.name}
          className={`text-heading mb-2 block ${isRequired ? "after:text-red-500 after:content-['*']" : ""}`}
        >
          {label}
        </label>
      )}
      <div
        className={`border-border relative h-12 w-full overflow-hidden rounded-xl border focus-within:border-blue-500 ${selectContainerClassName}`}
      >
        <select
          className={`input-field block size-full ps-2 ${className}`}
          {...props}
        >
          <option value="" disabled>
            {initailValue}
          </option>
          {isSelectALL && <option value="">All</option>}

          {selectedOption && (
            <option value={selectedOption.value}>
              {selectedOption.displayValue}
            </option>
          )}
          {content}
        </select>
      </div>

      {hasErr && (
        <small className="absolute top-[102%] flex items-center gap-1 leading-none text-red-400">
          <MdError className="text-md mt-1 shrink-0 self-start" />{" "}
          {error[props.name as string].message}
        </small>
      )}
    </div>
  );
};
export default Select;
