import { useTranslation } from "react-i18next";
// Enums
import { Directions, Languages } from "constants/enums";

const LanguageSwitcher = () => {
  // ################### LOCALES ###################
  const { i18n } = useTranslation();

  // ################### HANDLER ###################
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    // Change page direction based on selected language
    if (language === Languages.ARABIC) {
      document.documentElement.setAttribute("dir", Directions.RTL);
    } else {
      document.documentElement.setAttribute("dir", Directions.LTR);
    }
  };

  return (
    <div className="flex-center gap-4">
      <button
        className="text-heading font-bold hover:underline"
        onClick={() => changeLanguage(Languages.ENGLISH)}
      >
        English
      </button>
      -
      <button
        className="text-heading font-bold hover:underline"
        onClick={() => changeLanguage(Languages.ARABIC)}
      >
        عربي
      </button>
    </div>
  );
};

export default LanguageSwitcher;
