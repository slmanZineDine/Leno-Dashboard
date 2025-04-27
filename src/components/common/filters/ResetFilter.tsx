// React
import { useTranslation } from "react-i18next";
// Icons
import { IoClose } from "react-icons/io5";
// Utils
import { cn } from "@libs/utils";

interface ResetFilterProps {
  reset: () => void;
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

const ResetFilter = ({
  reset,
  className = "",
  showText = true,
  size = "md",
}: ResetFilterProps) => {
  // ################### LOCALES ###################
  const { t } = useTranslation();

  // ################### CONSTANTS ###################
  const sizeClasses = {
    sm: "p-1.5 text-sm",
    md: "p-2 text-base",
    lg: "p-2.5 text-lg",
  };

  return (
    <button
      onClick={reset}
      className={cn(
        "flex-center bg-hover text-heading hover:bg-borderColor relative w-fit cursor-pointer rounded-full transition-all",
        sizeClasses[size],
        className,
      )}
    >
      {showText && t("common.resetFilters")}
      <IoClose className={cn("ms-2", { "ms-0": !showText })} />
    </button>
  );
};

export default ResetFilter;
