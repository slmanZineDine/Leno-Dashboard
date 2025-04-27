// React
import { useState } from "react";
// Third-Party =====> react-i18next
import { useTranslation } from "react-i18next";
// Icons
import { IoLanguage } from "react-icons/io5";
// Utils
import { cn } from "@libs/utils";

const LanguageSwitcher = () => {
  // ################### LOCALES ###################
  const { i18n } = useTranslation();

  // ################### REACT HOOKS ###################
  const [isOpen, setIsOpen] = useState(false);

  // ################### CONSTANTS ###################
  const languages = [
    { code: "en", name: "English" },
    { code: "ar", name: "عربي" },
  ];

  // ################### HANDLERS ###################
  const currentLanguage = languages.find((lang) => lang.code === i18n.language);
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="border-border bg-box-bg text-text hover:bg-box-bg/80 flex items-center gap-2 rounded-lg border px-3 py-2 transition-colors"
      >
        <IoLanguage className="text-xl" />
        <span className="min-cmd:flex hidden items-center gap-2">
          {currentLanguage?.name}
        </span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="border-border bg-box-bg absolute start-0 z-50 mt-2 w-24 rounded-lg border py-2 shadow-lg">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => changeLanguage(language.code)}
                className={cn(
                  "text-text hover:bg-primary/10 flex w-full items-center justify-center px-4 py-2 text-center transition-colors",
                  i18n.language === language.code && "bg-primary/10 font-bold",
                )}
              >
                <span>{language.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;
