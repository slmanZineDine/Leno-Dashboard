// Third-Party ====> React-Router
import {
  Link,
  useRouteError,
  isRouteErrorResponse,
  useNavigate,
} from "react-router-dom";
// Third-Party ====> i18next
import { useTranslation } from "react-i18next";
// Data
import { paths } from "@routes/paths";
// SVG
import ErrorSvg from "@assets/svg/error.svg?react";

const Error = () => {
  // ################### REACT-ROUTER HOOKS ###################
  const error = useRouteError();
  const navigate = useNavigate();

  // ################### LOCALES ###################
  const { t } = useTranslation();

  // ################### DATA ###################
  let errorStatus;
  let errorStatusText: string;

  if (isRouteErrorResponse(error)) {
    errorStatus = error.status;
    errorStatusText = t(`error.status.${error.status}`, {
      defaultValue: t("error.status.default"),
    });
  } else {
    errorStatus = "";
    errorStatusText = t("error.description");
  }

  // ################### HANDLERS ###################
  const handleRetry = () => {
    navigate(0); // Reloads the current page
  };

  return (
    <section className="flex-center text-text container h-screen flex-col gap-2">
      <ErrorSvg className="-mt-16 -mb-4 max-h-96" />
      <h1 className="text-8xl font-bold">{errorStatus}</h1>
      <p className="text-center text-3xl">{errorStatusText}</p>
      <div className="flex gap-4">
        <button
          onClick={handleRetry}
          className="bg-primary hover:bg-primary-darker rounded-lg p-2 text-white transition-colors duration-300"
        >
          {t("error.retry")}
        </button>
        <Link
          to={paths.home.root}
          replace={true}
          className="bg-primary hover:bg-primary-darker rounded-lg p-2 text-white transition-colors duration-300"
        >
          {t("error.goHome")}
        </Link>
      </div>
    </section>
  );
};

export default Error;
