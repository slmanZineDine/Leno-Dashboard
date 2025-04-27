// Third-Party =====> i18next
import { useTranslation } from "react-i18next";
// Utils
import formatDate from "utils/time/formatDate";
// Constants
import { DAYS } from "constants/dateData";
// Typse
import type { TCalendar } from "@customTypes/common/global";

type TMonthViewProps = {
  calendar: TCalendar;
  selectedDay: string;
  handleSelectDay: (date: string, dayIndex: number, weekIndex: number) => void;
};

// ################### GLOBAL ###################
const today = formatDate(new Date());

const MonthView = ({
  calendar,
  selectedDay,
  handleSelectDay,
}: TMonthViewProps) => {
  // ################### LOCALES ###################
  const { t } = useTranslation();

  return (
    <table className="table-fixed border-spacing-1">
      <thead>
        <tr>
          {DAYS.map((day) => (
            <th key={day.id} className="overflow-hidden p-2 text-ellipsis">
              <span className="min-4xl:block hidden">
                {" "}
                {t(`days.${day.name}.name`)}
              </span>
              <span className="min-4xl:hidden text-sm">
                {t(`days.${day.name}.shortName`)}
              </span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {calendar.weeks &&
          calendar.weeks.map((week, weekIndex) => (
            <tr key={weekIndex}>
              {week.map((day, dayIndex) => (
                <td
                  key={day.id}
                  className="hover:bg-box-bg cursor-pointer p-1 pb-2 text-right align-text-top"
                  onClick={() => handleSelectDay(day.id, dayIndex, weekIndex)}
                >
                  <span
                    className={`flex-center text-md hover:border-primary size-8 rounded-full transition-all hover:border ${today === day.id && selectedDay === day.id ? "bg-primary font-extrabold text-white" : ""} ${today === day.id && selectedDay !== day.id ? "text-primary font-extrabold" : ""} ${selectedDay === day.id ? "border-primary text-primary border font-extrabold" : ""}`}
                  >
                    {day.title}
                  </span>
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default MonthView;
