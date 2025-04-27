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
  error?: any; // This type { [key: string]: { message?: string } } occurred an error so, I use any type just temporary
  type?: HTMLInputTypeAttribute;
  isRequired?: boolean;
  inputClassName?: string;
  containerClassName?: string;
  iconClassName?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const InputFieldset = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error = {},
      icon,
      type = "text",
      isRequired = true,
      inputClassName = "",
      containerClassName = "",
      iconClassName = "",
      ...props
    },
    ref,
  ) => {
    // ################### REACT HOOKS ###################
    const [inputType, setInputType] = useState<string>(type);

    // ################### SETTINGS ###################
    const hasErr = props?.name && error?.[props.name];

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
      <div className={`relative w-full ${containerClassName}`}>
        <fieldset
          className={`group border-border bg-input-bg focus-within:border-primary rounded-lg border px-3 pb-2 ${hasErr ? "border-red-600" : "border-border"}`}
        >
          <legend
            className={`text-md text-text group-focus-within:text-primary px-2 ${
              isRequired ? "after:text-red-500 after:content-['*']" : ""
            }`}
          >
            {label}
          </legend>
          <div className="relative">
            <input
              id={props.name}
              ref={ref}
              type={inputType}
              className={`text-md caret-primary h-[30px] w-full rounded-xl border-none bg-transparent ps-2 ${icon ? "ps-2 pe-14" : "px-2"} ${inputClassName}`}
              autoComplete={type === "password" ? "off" : "on"}
              {...props}
            />
            {inputIcon}
          </div>
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

export default InputFieldset;
