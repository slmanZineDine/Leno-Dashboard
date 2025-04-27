// React
import { useEffect } from "react";
// Third-Party =====> react-router-dom
import { useLocation } from "react-router-dom";
// Data
import { pathTitleMap } from "@routes/pathTitleMap";
import { useTranslation } from "react-i18next";

const usePageTitle = () => {
  // ################### REACT ROUTER HOOKS ###################
  const { pathname } = useLocation();

  // ################### LOCALES ###################
  const { t, i18n } = useTranslation();

  // ################### SIDE EFFECT ###################
  useEffect(() => {
    const getPathTitle = () => {
      if (pathname === "/") {
        return pathTitleMap[pathname];
      }
      // Get only three paths and remove edit page.
      const pathnames = pathname.split("/").filter((x, i) => x !== "" && i < 3);
      const lastPathname = pathnames.at(-1) ?? "";

      return pathTitleMap[lastPathname as keyof typeof pathTitleMap] || null;
    };

    const pageTitle = getPathTitle();
    const appName = t("pages.appName");
    document.title = pageTitle ? `${t(pageTitle)} | ${appName}` : appName;
  }, [pathname, pathTitleMap, i18n.language]);
};

export default usePageTitle;
