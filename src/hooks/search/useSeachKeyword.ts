// React
import { ChangeEvent, useState } from "react";
// My-Hooks
import useDebounce from "@hooks/common/useDebounce";

const useSeachKeyword = (): [
  string,
  (event: ChangeEvent<HTMLInputElement>) => void,
  (value: string) => void,
] => {
  // ################### REACT HOOKS ###################
  const [searchKeyword, setSearchKeyword] = useState("");

  // ################### CUSTOM HOOKS ###################
  const debouncedSearchKeyword = useDebounce(searchKeyword);

  // ################### HANLDER ###################
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  return [debouncedSearchKeyword, handleChange, setSearchKeyword];
};

export default useSeachKeyword;
