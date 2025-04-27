// React
import { forwardRef, InputHTMLAttributes } from "react";
// Icons
import { MdError } from "react-icons/md";

type TTextareaFieldset = {
  label?: string;
  error?: any; // This type  { [key: string]: { message?: string } } occure an errorm so I use any just temp
  isRequired?: boolean;
  hasNumberOnly?: boolean;
  inputClassName?: string;
  containerClassName?: string;
} & InputHTMLAttributes<HTMLTextAreaElement>;

const TextareaFieldset = forwardRef<HTMLTextAreaElement, TTextareaFieldset>(
  (
    {
      label,
      error = {},
      isRequired = true,
      inputClassName = "",
      containerClassName = "",
      ...props
    },
    ref,
  ) => {
    // ################### SETTINGS ###################
    const hasErr = props?.name && error?.[props.name];

    return (
      <div className={`relative w-full ${containerClassName}`}>
        <fieldset
          className={`group bg-input-bg focus-within:border-primary rounded-lg border px-3 pb-2 ${hasErr ? "border-red-600" : "border-border"}`}
        >
          <legend
            className={`text-md text-text group-focus-within:text-primary px-2 ${
              isRequired ? "after:text-red-500 after:content-['*']" : ""
            }`}
          >
            {label}
          </legend>
          <div className="relative">
            <textarea
              id={props.name}
              ref={ref}
              className={`text-md text-text caret-primary min-h-24 w-full resize-none rounded-xl border-none bg-transparent px-2 ps-2 ${inputClassName}`}
              {...props}
            ></textarea>
          </div>
        </fieldset>
        {hasErr && (
          <small className="absolute top-[102%] flex items-center gap-2 text-red-400">
            <MdError className="text-md mt-1 shrink-0 self-start" />{" "}
            {error[props.name as string].message}
          </small>
        )}
      </div>
    );
  },
);

export default TextareaFieldset;
