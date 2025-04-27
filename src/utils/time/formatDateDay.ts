import { DAYS, MONTHS } from "constants/dateData";
import convertGMTtoLocal from "./convertGMTtoLocal";
import { t } from "i18next";

/**
 * Formats a date string into a custom display format.
 *
 * @param {string} dateTime - The original date string in GMT format.
 * @param {boolean} [withNames=false] - Flag to include full weekday and month names.
 * @returns {string} - A formatted date string or an empty string if the input is invalid.
 */
function formatDateDay(dateTime: string, withNames: boolean = false): string {
  const localDate = convertGMTtoLocal(dateTime, "datetime")?.split(" ")?.[0];
  if (!localDate) return "";

  const [year, month, day] = localDate.split("-");
  const currentYear = new Date().getFullYear();
  const dateObject = new Date(localDate);

  const dayName = t(`days.${DAYS[dateObject.getDay()]?.name}.name`);
  const monthName = t(`months.${MONTHS[dateObject.getMonth()]?.name}.name`);

  if (!dayName || !monthName) return "";

  // Use full names for weekday and month if `withNames` is true
  if (withNames) {
    return `${dayName}, ${+day} ${monthName} ${year}`;
  }

  // Format based on current year
  const formattedDay = day.toString().padStart(2, "0");
  const formattedMonth = month.toString().padStart(2, "0");

  if (currentYear === +year) {
    return `${dayName} ${formattedMonth}/${formattedDay}`;
  }

  return `${dayName} ${formattedMonth}/${formattedDay}, ${year}`;
}

export default formatDateDay;
