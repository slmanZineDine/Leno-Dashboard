import { useTranslation } from "react-i18next";
import { cn } from "@libs/utils";

interface FilterItemProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const FilterItem = ({ label, isSelected, onClick }: FilterItemProps) => (
  <li
    className={cn(
      "border-border hover:bg-box-bg cursor-pointer rounded-xl border px-4 py-1 capitalize transition duration-200",
      isSelected && "bg-box-bg font-bold drop-shadow-lg",
    )}
    onClick={onClick}
  >
    {label}
  </li>
);

interface FilterSectionProps<T extends string> {
  filters: T[];
  selectedFilter: T | "";
  onFilterChange: (filter: T | "") => void;
  allFilterLabel?: string;
  className?: string;
  filterLabel?: string;
  filterClassName?: string;
}

const FilterSection = <T extends string>({
  filters,
  selectedFilter,
  onFilterChange,
  allFilterLabel = "common.all",
  className = "",
  filterLabel = "common.filters",
  filterClassName = "text-text flex flex-wrap items-center gap-3 ps-4",
}: FilterSectionProps<T>) => {
  const { t } = useTranslation();

  return (
    <div className={className}>
      <h3 className="mb-2">{t(filterLabel)}:</h3>
      <ul className={filterClassName}>
        <FilterItem
          label={t(allFilterLabel)}
          isSelected={selectedFilter === ""}
          onClick={() => onFilterChange("")}
        />
        {filters.map((filter) => (
          <FilterItem
            key={filter}
            label={t(`common.${filter}`)}
            isSelected={selectedFilter === filter}
            onClick={() => onFilterChange(filter)}
          />
        ))}
      </ul>
    </div>
  );
};

export default FilterSection;
