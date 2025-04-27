// React
import { useState, useEffect } from "react";

/** ----------------------------------------------
 * Custom hook for Debounce search input
 * @param {string} value - The input value to be debounced.
 * @param {number} delay - The time (in milliseconds) to wait before updating the debounced value, by default 500 ms.
 * @returns {string} - The debounced value.
---------------------------------------------- */

const useDebounce = (value: string, delay: number = 500): string => {
  // ################### REACT HOOKS ###################
  const [debouncedValue, setDebouncedValue] = useState(value);

  // ################### SIDE EFFECT ###################
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
