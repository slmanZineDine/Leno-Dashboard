// React
import {
  useRef,
  useState,
  useEffect,
  MutableRefObject,
  SetStateAction,
  Dispatch,
} from "react";

const useOutsideClick = (): [
  boolean,
  Dispatch<SetStateAction<boolean>>,
  MutableRefObject<HTMLDivElement | null>,
] => {
  // ################### REACT HOOKS ###################
  const ref = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // ################### SIDE EFFECT ###################
  useEffect(() => {
    // ################### HANDLER ###################
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node))
        setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return [isOpen, setIsOpen, ref];
};

export default useOutsideClick;
