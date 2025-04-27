// Third-Party =====> i18n
import { useTranslation } from "react-i18next";
// Types
import type { TCalendarView } from "@customTypes/common/global";

type TCalendarViewButtonsProps = {
  view: TCalendarView;
  setView: (view: TCalendarView) => void;
};

const CalendarViewButtons = ({ view, setView }: TCalendarViewButtonsProps) => {
  // ################### LOCALES ###################
  const { t } = useTranslation();

  return (
    <div className="join">
      <button
        className={`btn join-item bg-primary text-white ${view === "month" ? "bg-secondary hover:bg-secondary" : "bg-primary hover:bg-blue-900"}`}
        onClick={() => setView("month")}
      >
        {t("calendar.monthView")}
      </button>
      <button
        className={`btn join-item bg-primary text-white ${view === "weeks" ? "bg-secondary hover:bg-secondary" : "bg-primary hover:bg-blue-900"}`}
        onClick={() => setView("weeks")}
      >
        {t("calendar.weekView")}
      </button>
      <button
        className={`btn join-item bg-primary text-white ${view === "day" ? "bg-secondary hover:bg-secondary" : "bg-primary hover:bg-blue-900"}`}
        onClick={() => setView("day")}
      >
        {t("calendar.dayView")}
      </button>
    </div>
  );
};

export default CalendarViewButtons;
