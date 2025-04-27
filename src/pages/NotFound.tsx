// Third-Party =====> react-router-dom
import { Link, useNavigate } from "react-router-dom";
// Third-Party =====> i18next
import { useTranslation } from "react-i18next";
// Data
import { paths } from "@routes/paths";
// SVG
import NotFoundSvg from "@assets/svg/not_found.svg?react";

const NotFound = () => {
  // ################### REACT-ROUTER HOOKS ###################
  const navigate = useNavigate();

  // ################### LOCALES ###################
  const { t } = useTranslation();

  // ################### HANDLER ###################
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <section className="flex-center text-text container h-screen flex-col gap-4">
      <NotFoundSvg className="-mt-16 -mb-4 max-h-96" />
      <p className="text-center text-3xl">{t("notFound.title")}</p>
      <div className="flex-between gap-4">
        <Link
          to={paths.home.root}
          replace={true}
          className="bg-primary hover:bg-primary-darker rounded-lg p-2 text-white transition-colors duration-300"
        >
          {t("notFound.goHome")}
        </Link>
        <button
          className="bg-primary hover:bg-primary-darker rounded-lg p-2 text-white transition-colors duration-300"
          onClick={handleBack}
        >
          {t("notFound.goBack")}
        </button>
      </div>
    </section>
  );
};

export default NotFound;
