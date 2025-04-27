// My-Hooks
import useOutsideClick from "@hooks/common/useOutsideClick";
// Icons
import { PropsWithChildren } from "react";
import { HiDotsHorizontal } from "react-icons/hi";

const ToolsMenu = ({ children }: PropsWithChildren) => {
  // ################### CUSTOM HOOKS ###################
  const [isOpen, setIsOpen, elementRef] = useOutsideClick();

  return (
    <div className="absolute start-2 top-[102%]" ref={elementRef}>
      <div
        className={`flex-center bg-primary size-9 cursor-pointer rounded-full`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <HiDotsHorizontal
          className={`text-2xl text-white transition-transform duration-200 ${
            isOpen ? "rotate-90" : ""
          }`}
        />
      </div>
      {isOpen && children}
    </div>
  );
};

export default ToolsMenu;
