// React
import {
  useState,
  ReactNode,
  forwardRef,
  InputHTMLAttributes,
  HTMLInputTypeAttribute,
} from "react";
// Icons
import { MdError } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";

type InputProps = {
  label?: string;
  icon?: ReactNode;
  error?: { [key: string]: { message?: string } };
  type?: HTMLInputTypeAttribute;
  isRequired?: boolean;
  containerClassName?: string;
  inputClassName?: string;
  iconClassName?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const InputField = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error = {},
      icon,
      type = "text",
      isRequired = true,
      containerClassName = "",
      inputClassName = "",
      iconClassName = "",
      ...props
    },
    ref,
  ) => {
    // ################### REACT HOOKS ###################
    const [inputType, setInputType] = useState<string>(type);

    // ################### SETTINGS ###################
    const hasErr = props?.name && error[props.name];

    // ################### HANDLER ###################
    const toggleType = () =>
      setInputType((prev) => (prev === "password" ? "text" : "password"));

    // ################### CONTENT ###################
    let inputIcon;
    if (type === "password") {
      inputIcon = (
        <span
          onClick={toggleType}
          className={`text-content absolute start-4 top-1/2 -translate-y-1/2 cursor-pointer text-xl ${iconClassName}`}
        >
          {inputType === "password" ? <FaRegEyeSlash /> : <IoEyeOutline />}
        </span>
      );
    } else if (icon) {
      inputIcon = (
        <span
          className={`text-content absolute start-4 top-1/2 -translate-y-1/2 cursor-pointer text-xl ${iconClassName}`}
        >
          {icon}
        </span>
      );
    }

    return (
      <div className={containerClassName}>
        {label && (
          <label
            htmlFor={props.name}
            className={`text-md text-heading mb-2 block font-bold ${isRequired ? "after:text-red-500 after:content-['*']" : ""}`}
          >
            {label}
          </label>
        )}
        <div
          className={`relative h-12 w-full overflow-hidden rounded-xl border ${hasErr ? "border-red-600" : "border-border"} focus-within:border-primary`}
        >
          <input
            id={props.name}
            ref={ref}
            type={inputType}
            className={`size-full rounded-xl ${icon ? "ps-12 pe-2" : "px-2"} ${inputClassName}`}
            autoComplete={type === "password" ? "off" : "on"}
            {...props}
          />
          {inputIcon}
        </div>

        {hasErr && (
          <small className="flex items-center gap-2 text-red-400">
            <MdError /> {error[props.name as string].message}
          </small>
        )}
      </div>
    );
  },
);

export default InputField;
