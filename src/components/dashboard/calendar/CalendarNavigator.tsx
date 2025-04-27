// Third-Party =====> react-i18next
import { useTranslation } from "react-i18next";
// Icons
import { IoIosArrowBack } from "react-icons/io";
// Constants
import { Directions } from "constants/enums";
// Types
import { TCalendarView } from "@customTypes/common/global";

type TCalendarNavigatorProps = {
  view: TCalendarView;
  moveToPrevMonth: () => void;
  moveToPrevWeek: () => void;
  moveToPrevDay: () => void;
  moveToNextMonth: () => void;
  moveToNextWeek: () => void;
  moveToNextDay: () => void;
};

const CalendarNavigator = ({
  view,
  moveToPrevMonth,
  moveToPrevWeek,
  moveToPrevDay,
  moveToNextMonth,
  moveToNextWeek,
  moveToNextDay,
}: TCalendarNavigatorProps) => {
  // ################### LOCALES ###################
  const { t, i18n } = useTranslation();

  // ################### HANDLER ###################
  const handleClick = (type: "next" | "prev") => {
    switch (view) {
      case "month":
        type === "next" ? moveToNextMonth() : moveToPrevMonth();
        break;
      case "weeks":
        type === "next" ? moveToNextWeek() : moveToPrevWeek();
        break;
      case "day":
        type === "next" ? moveToNextDay() : moveToPrevDay();

        break;
      default:
        console.warn("Invalid view type");
    }
  };

  return (
    <div className="join">
      <button
        title={t("buttons.previous")}
        className="btn join-item bg-primary text-xl text-white hover:bg-blue-900"
        onClick={() => handleClick("prev")}
      >
        <IoIosArrowBack
          className={`${i18n.dir(i18n.language) === Directions.RTL ? "rotate-180" : ""}`}
        />
      </button>
      <button
        title={t("buttons.next")}
        className="btn join-item bg-primary text-xl text-white hover:bg-blue-900"
        onClick={() => handleClick("next")}
      >
        <IoIosArrowBack
          className={`${i18n.dir(i18n.language) === Directions.RTL ? "" : "rotate-180"}`}
        />
      </button>
    </div>
  );
};

export default CalendarNavigator;
