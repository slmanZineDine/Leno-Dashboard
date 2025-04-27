import { ChangeEvent, useMemo, useState } from "react";
import { PAGE_SIZE } from "constants/constants";

interface UseDataFilteringProps<T> {
  data: T[];
  searchPath: string;
  filterFn?: (item: T) => boolean;
}

interface UseDataFilteringReturn<T> {
  filteredData: T[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  totalCount: number;
  searchValue: string;
}

/**
 * A custom React hook that combines filtering, searching, and pagination functionality.
 *
 * @template T - The type of items in the data array.
 * @param {T[]} props.data - The array of data to be processed
 * @param {string} props.searchPath - The path to the property to search within each item
 * @param {(item: T) => boolean} [props.filterFn] - Optional filter function
 *
 * @returns {UseDataFilteringReturn<T>} An object containing:
 * - filteredData: The paginated results after filtering and searching
 * - currentPage: The current page number
 * - setCurrentPage: Function to change the current page
 * - handleSearch: Function to handle search input changes
 * - totalCount: Total number of items after filtering and searching
 * - searchValue: Current search value
 *
 * @example
 * ```tsx
 * const {
 *   filteredData,
 *   currentPage,
 *   setCurrentPage,
 *   handleSearch,
 *   totalCount
 * } = useDataFiltering({
 *   data: users,
 *   searchPath: "name",
 *   filterFn: (user) => user.isActive
 * });
 * ```
 */
const useDataFiltering = <T extends Record<string, any>>({
  data,
  searchPath,
  filterFn,
}: UseDataFilteringProps<T>): UseDataFilteringReturn<T> => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Memoize the filtered and searched data
  const filteredData = useMemo(() => {
    let result = [...data];

    // Apply filter function if provided
    if (filterFn) {
      result = result.filter(filterFn);
    }

    // Apply search if search value exists
    if (searchValue) {
      const regex = new RegExp(searchValue, "i");
      result = result.filter((item) => {
        if (searchPath.includes(".")) {
          const keys = searchPath.split(".");
          const nestedValue = keys.reduce((acc, key) => acc?.[key], item);
          return typeof nestedValue === "string" && regex.test(nestedValue);
        }
        const value = item[searchPath];
        return typeof value === "string" && regex.test(value);
      });
    }

    return result;
  }, [data, searchValue, filterFn, searchPath]);

  // Memoize the paginated data
  const paginatedData = useMemo(() => {
    const startIdx = (currentPage - 1) * PAGE_SIZE;
    const endIdx = currentPage * PAGE_SIZE;
    return filteredData.slice(startIdx, endIdx);
  }, [filteredData, currentPage]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setSearchValue(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  return {
    filteredData: paginatedData,
    currentPage,
    setCurrentPage,
    handleSearch,
    totalCount: filteredData.length,
    searchValue,
  };
};

export default useDataFiltering;
