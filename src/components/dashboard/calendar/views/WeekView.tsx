// Third-Party =====> i18next
import { useTranslation } from "react-i18next";
// Utils
import formatDate from "@utils/time/formatDate";
// Data
import { DAYS } from "constants/dateData";
// Types
import type { TCalendar } from "@customTypes/common/global";

type TWeekViewProps = {
  calendar: TCalendar;
  currentWeekIndex: number;
  selectedDay: string;
  handleSelectDay: (date: string, dayIndex: number, weekIndex: number) => void;
};

// ################### GLOBAL ###################
const today = formatDate(new Date());

const WeekView = ({
  calendar,
  currentWeekIndex,
  selectedDay,
  handleSelectDay,
}: TWeekViewProps) => {
  // ################### LOCALES ###################
  const { t } = useTranslation();

  return (
    <table className="table-fixed border-spacing-1">
      <thead>
        <tr>
          {DAYS.map((day, i) => (
            <th key={day.id} className="max-3xl:p-2">
              <div className="flex h-14 flex-col items-center justify-between gap-1 overflow-hidden text-ellipsis">
                <span className="max-cmd:text-xs min-4xl:block hidden">
                  {t(`days.${day.name}.name`)}
                </span>
                <span className="max-cmd:text-xs min-4xl:hidden">
                  {t(`days.${day.name}.shortName`)}
                </span>
                <span className="max-3xl:[writing-mode:vertical-lr]">
                  {calendar.weeks?.[currentWeekIndex]?.[i]?.name}
                </span>
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {calendar.weeks &&
            calendar.weeks[currentWeekIndex].map((day, dayIndex) => (
              <td
                key={day.id}
                className="hover:bg-box-bg cursor-pointer p-1 pb-2 text-right align-text-top"
                onClick={() =>
                  handleSelectDay(day.id, dayIndex, currentWeekIndex)
                }
              >
                <span
                  className={`flex-center text-md hover:border-primary size-8 rounded-full transition-all hover:border ${today === day.id && selectedDay === day.id ? "bg-primary font-extrabold text-white" : ""} ${today === day.id && selectedDay !== day.id ? "text-primary font-extrabold" : ""} ${selectedDay === day.id ? "border-primary text-primary border font-extrabold" : ""}`}
                >
                  {day.title}
                </span>
                <div className="mt-4 min-h-60 space-y-2"></div>
              </td>
            ))}
        </tr>
      </tbody>
    </table>
  );
};

export default WeekView;
