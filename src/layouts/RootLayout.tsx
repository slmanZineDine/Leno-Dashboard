// Third-Party =====> react-router-dom
import { Outlet } from "react-router-dom";
import { useAppSelector } from "@redux/hooks";
// Third-Party =====> redux
import { selectCurrentTheme } from "@redux/slices/app/appSlice";
// Third-Party =====> react-i18next
import { useTranslation } from "react-i18next";
// Third-Party =====> react-toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// My-Hooks
import usePageTitle from "@hooks/common/usePageTitle";
import useNetworkStatus from "@hooks/common/useNetworkStatus";
import { Directions, Languages } from "constants/enums";
import { useEffect } from "react";

const RootLayout = () => {
  // ################### REDUX HOOKS ###################
  const themeMode = useAppSelector(selectCurrentTheme);

  // ################### LOCALES ###################
  const { i18n } = useTranslation();

  // ################### CUSTOM HOOKS ###################
  usePageTitle();
  useNetworkStatus();

  // ################### SIDE EFFECT ###################
  useEffect(() => {
    // Change page direction based on selected language
    if (i18n.language === Languages.ARABIC) {
      document.documentElement.setAttribute("dir", Directions.RTL);
    } else {
      document.documentElement.setAttribute("dir", Directions.LTR);
    }
  }, [i18n.language]);

  return (
    <>
      <ToastContainer
        theme={themeMode}
        position="top-center"
        autoClose={3000}
        hideProgressBar
        rtl={i18n.dir(i18n.language) === Directions.RTL}
      />
      <Outlet />
    </>
  );
};

export default RootLayout;
