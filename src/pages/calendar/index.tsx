// Third-Party =====> i18n
import { useTranslation } from "react-i18next";
// My-Components
import Calendar from "@components/dashboard/calendar/Calendar";
import HeadingSection from "@components/common/sections/HeadingSection";
// Data
import { pathTitleMap } from "@routes/pathTitleMap";

const CalendarPage = () => {
  // ################### LOCALES ###################
  const { t } = useTranslation();

  return (
    <>
      {/* ========================== Main Heading ========================== */}
      <HeadingSection title={t(pathTitleMap.calendar)} />

      {/* ========================== Content ========================== */}
      <section className="container">
        <Calendar />
      </section>
    </>
  );
};

export default CalendarPage;
