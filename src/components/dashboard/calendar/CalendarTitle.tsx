// Third-Party =====> react-i18next
import { useTranslation } from "react-i18next";
// Data
import { MONTHS } from "constants/dateData";
// Types
import { TCalendar, TCalendarView } from "@customTypes/common/global";

type TCalendarTitleProps = {
  view: TCalendarView;
  theDate: Date;
  selectedDay: string;
  calendar: TCalendar;
  currentWeekIndex: number;
  currentDayIndex: number;
};

const CalendarTitle = ({
  view,
  theDate,
  selectedDay,
  calendar,
  currentWeekIndex,
  currentDayIndex,
}: TCalendarTitleProps) => {
  // ################### LOCALES ###################
  const { t } = useTranslation();

  // ################### HANDLER ###################
  const renderTitle = () => {
    switch (view) {
      case "month":
        return (
          <span>
            {theDate.getFullYear()}{" "}
            {t(`months.${MONTHS[theDate.getMonth()].name}.name`)}
          </span>
        );
      case "weeks":
        const weekStart = calendar.weeks[currentWeekIndex][0];
        const weekEnd = calendar.weeks[currentWeekIndex][6];
        const weekStartMonth = t(
          `months.${MONTHS[new Date(weekStart.id).getMonth()].name}.name`,
        );
        const weekEndMonth = t(
          `months.${MONTHS[new Date(weekEnd.id).getMonth()].name}.name`,
        );
        const isDifferentMonth = weekEnd.title < weekStart.title;
        return (
          <span className="line-clamp-1">
            {new Date(selectedDay).getFullYear()}, {weekStart.title}{" "}
            {isDifferentMonth ? weekStartMonth : ""} - {weekEnd.title}{" "}
            {weekEndMonth}
          </span>
        );
      case "day":
        const dayTitle =
          calendar.weeks[currentWeekIndex][currentDayIndex].title;
        return (
          <span>
            {new Date(selectedDay).getFullYear()}, {dayTitle}{" "}
            {t(`months.${MONTHS[new Date(selectedDay).getMonth()].name}.name`)}
          </span>
        );
      default:
        return <span>Invalid view</span>;
    }
  };

  return (
    <div className="text-heading text-lg font-extrabold">{renderTitle()}</div>
  );
};

export default CalendarTitle;
