// React
import { useEffect, useRef } from "react";
// Third-Party ====> React-Router
import { Link } from "react-router-dom";
// Third-Party ====> Redux
import { useAppSelector } from "@redux/hooks";
import { selectIsAdmin } from "@redux/slices/auth/authSlice";
// My-Components
import ToggleMenu from "@components/common/navbar/ToggleMenu";
import NavAccount from "@components/common/navbar/NavAccount";
import ThemeToggle from "@components/common/navbar/ThemeToggle";
import LanguageSwitcher from "@components/common/navbar/LanguageSwitcher";
import NavNotifications from "@components/common/navbar/notification/NavNotifications";
// Icons
import { SlHome } from "react-icons/sl";
import { RiSettings3Fill } from "react-icons/ri";
// Data
import { paths } from "@routes/paths";

type THeaderProps = {
  isShowAside: boolean;
  onToggleClick: any;
  isLoading: boolean;
};

const Header = ({ isShowAside, onToggleClick, isLoading }: THeaderProps) => {
  // ################### REDUX HOOKS ###################
  const isAdmin = useAppSelector(selectIsAdmin);

  // ################### REACT HOOKS ###################
  const headerElement = useRef<HTMLElement | null>(null);

  // ################### HANDLER ###################
  const handleScroll = () => {
    if (headerElement.current) {
      const ele = headerElement.current;
      window.scrollY > 25
        ? ele.classList.add("header-sticky")
        : ele.classList.remove("header-sticky");
    }
  };

  // ################### SIDE EFFECT ###################
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header ref={headerElement} className="fixed top-0 left-0 z-[100] w-full">
      <nav className="flex-between min-h-header-height relative container h-16 flex-row-reverse gap-4">
        <div className="flex items-center gap-2">
          <LanguageSwitcher />

          {/* ========================== Switch Light/Dark Mode ========================== */}
          <ThemeToggle />

          {/* ========================== Settings ========================== */}
          {isAdmin && (
            <Link
              to={paths.settings.root}
              className="navbar-icon min-cmd:flex hidden"
            >
              <RiSettings3Fill className="animate-spin-slow" />
            </Link>
          )}

          {/* ========================== Notification ========================== */}
          <NavNotifications />

          {/* ========================== Links ========================== */}
          <Link to={paths.home.root} className="navbar-icon max-5xl:hidden">
            <SlHome />
          </Link>

          {/* ========================== Account ========================== */}
          <NavAccount isLoading={isLoading} />
        </div>

        {!isShowAside && (
          <div className="flex items-center gap-4">
            {/* ========================== Toggle ========================== */}
            <ToggleMenu
              isShowAside={isShowAside}
              onToggleClick={onToggleClick}
            />

            {/* ========================== Logo ========================== */}
            <Link to={paths.home.root}>
              <h2 className="text-primary text-2xl font-extrabold">Leno</h2>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
