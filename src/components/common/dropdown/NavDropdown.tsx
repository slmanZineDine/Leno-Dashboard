// My-Hooks
import useOutsideClick from "@hooks/common/useOutsideClick";

type TNavDropdown = {
  icon: React.ReactNode;
  dropdownClassName?: string;
  children: React.ReactNode;
};

const NavDropdown = ({
  icon,
  dropdownClassName = "",
  children,
}: TNavDropdown) => {
  // ################### CUSTOM HOOKS ###################
  const [isOpen, setIsOpen, elementRef] = useOutsideClick();

  return (
    <div
      className="flex-center cursor-pointer gap-2"
      ref={elementRef}
      onClick={() => setIsOpen(!isOpen)}
    >
      {icon}

      {isOpen && (
        <div
          className={`bg-box-bg text-text absolute top-full rounded-lg font-bold shadow-lg drop-shadow-lg ${dropdownClassName}`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default NavDropdown;
