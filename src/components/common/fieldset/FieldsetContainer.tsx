// React
import { ReactNode } from "react";
// Icons
import { MdError } from "react-icons/md";

type TFieldsetContainer = {
  label: string;
  name: string;
  error?: any; // This type { [key: string]: { message?: string } } occurred an error so, I use any type just temporary
  isRequired?: boolean;
  containerClassName?: string;
  children: ReactNode;
};

const FieldsetContainer = ({
  label,
  name,
  error = {},
  isRequired = true,
  containerClassName = "",
  children,
}: TFieldsetContainer) => {
  // ################### SETTINGS ###################
  const hasErr = name && error[name];

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
        {children}
      </fieldset>
      {hasErr && (
        <small className="absolute top-[102%] flex items-center gap-2 text-red-400">
          <MdError className="text-md mt-1 shrink-0 self-start" />{" "}
          {error[name as string].message}
        </small>
      )}
    </div>
  );
};

export default FieldsetContainer;
