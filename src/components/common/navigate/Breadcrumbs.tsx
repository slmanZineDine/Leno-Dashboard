// Third-Party ====> React-Router
import { Link, NavLink, useLocation } from "react-router-dom";
// Data
import { paths } from "@routes/paths";
import { pathTitleMap } from "@routes/pathTitleMap";
import { useTranslation } from "react-i18next";

const Breadcrumbs = () => {
  // ################### REACT ROUTER HOOKS ###################
  const location = useLocation();
  const pathnames = location.pathname
    .split("/")
    .filter((x, i) => x !== "" && i < 3 && !x.startsWith("edit-")); // Get only three paths and remove edit page.
  const { t } = useTranslation();

  return (
    <div className="text-text mb-4">
      <Link
        to={paths.home.root}
        className="hover:bg-primary/5 hover:text-text rounded-lg p-2 ps-0"
      >
        {t(pathTitleMap[paths.home.root as keyof typeof pathTitleMap])}
      </Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

        return (
          <span key={to}>
            {" > "}
            <NavLink
              to={to}
              end
              className={({ isActive }) =>
                `p-2 ${
                  isActive
                    ? "font-bold underline"
                    : "hover:bg-primary/5 hover:text-text rounded-lg"
                }`
              }
            >
              {t(pathTitleMap[value as keyof typeof pathTitleMap])}
            </NavLink>
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
