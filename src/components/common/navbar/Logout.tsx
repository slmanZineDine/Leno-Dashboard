// Third-Party =====> redux
import { useAppDispatch } from "@redux/hooks";
import { logOut } from "@redux/slices/auth/authSlice";
// Third-Party =====> react-i18next
import { useTranslation } from "react-i18next";
// Icons
import { RiLogoutCircleLine } from "react-icons/ri";

const Logout = () => {
  // ################### REDUX HOOKS ###################
  const dispatch = useAppDispatch();

  // ################### LOCALES ###################
  const { t } = useTranslation();

  // ################### HANDLER ###################
  const handleLogout = () => dispatch(logOut());

  return (
    <button
      className={`hover:bg-hover flex w-full items-center gap-2 px-4 py-2 text-red-500 transition-all duration-300`}
      onClick={handleLogout}
    >
      <RiLogoutCircleLine className="text-2xl" />

      {t("navbar.logout")}
    </button>
  );
};

export default Logout;
