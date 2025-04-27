// React
import { ReactNode, useState } from "react";
// Icons
import { IoIosArrowDown } from "react-icons/io";

type TProps = {
  title: string;
  children: ReactNode;
  borderColor: string;
  arrowColor: string;
  onTitleClick?: () => void;
};

const DropdownBox = ({
  title,
  borderColor,
  arrowColor,
  children,
  onTitleClick = () => {},
}: TProps) => {
  // ################### REACT HOOKS ###################
  const [isOpen, setIsOpen] = useState(false);

  // ################### HANDLER ###################
  const handleOpenDropdown = () => setIsOpen(!isOpen);

  return (
    <section>
      <div
        className={`border-t-4 ${borderColor} shadow-form-shadow dark:shadow-form-dark-shadow px-4 ${
          isOpen ? "pb-4" : ""
        } bg-box-bg rounded-xl`}
      >
        <header
          className="flex-between cursor-pointer py-3"
          onClick={() => {
            handleOpenDropdown();
            onTitleClick();
          }}
        >
          <h2 className={`font-extrabold ${arrowColor}`}>{title}</h2>
          <IoIosArrowDown
            className={`text-2xl ${arrowColor} transition-transform duration-300 ${
              isOpen ? "-rotate-180" : ""
            }`}
          />
        </header>
        {isOpen && children}
      </div>
    </section>
  );
};

export default DropdownBox;
