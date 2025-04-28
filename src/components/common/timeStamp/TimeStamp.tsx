// Third-Party =====> i18next
import { useTranslation } from "react-i18next";
// Enums
import { Languages } from "constants/enums";

/** ----------------------------------------------
 * Component to display a timestamp in a human-readable "time ago" format.
*
* @component
* @example
* // Returns a time element displaying "2 hours ago"
* <TimeStamp timestamp="2024-08-28T08:00:00Z" />
*
* @param {string} timestamp - The ISO 8601 timestamp to be converted.
---------------------------------------------- */

type TTimeStampProps = {
  timestamp: string;
  className?: string;
};

const TimeStamp = ({ timestamp, className = "" }: TTimeStampProps) => {
  // ################### LOCALE ###################
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === Languages.ARABIC;

  /** ----------------------------------------------
    * Converts a date to a human-readable "time ago" format.
    *
    * @param {string} theDate - The ISO 8601 date string to be converted.
    * @returns {string} The formatted "time ago" string.
    ---------------------------------------------- */
  const handleTimeAgo = (theDate: string): string => {
    if (!theDate) return "";
    const eventDate = new Date(theDate);
    const thisMoment = new Date();
    const diffInMinutes = (thisMoment.getTime() - eventDate.getTime()) / 60000;

    if (diffInMinutes < 1) return t("common.time.now");

    if (diffInMinutes < 60) {
      const minutes = Math.trunc(diffInMinutes);
      const timeUnit =
        minutes === 1 ? t("common.time.minute") : t("common.time.minutes");
      return isArabic
        ? `${t("common.time.ago")} ${minutes} ${timeUnit}`
        : `${minutes} ${timeUnit} ${t("common.time.ago")}`;
    }

    if (diffInMinutes < 1440) {
      const hours = Math.trunc(diffInMinutes / 60);
      const timeUnit =
        hours === 1 ? t("common.time.hour") : t("common.time.hours");
      return isArabic
        ? `${t("common.time.ago")} ${hours} ${timeUnit}`
        : `${hours} ${timeUnit} ${t("common.time.ago")}`;
    }

    if (diffInMinutes < 10080) {
      const days = Math.trunc(diffInMinutes / 1440);
      const timeUnit =
        days === 1 ? t("common.time.day") : t("common.time.days");
      return isArabic
        ? `${t("common.time.ago")} ${days} ${timeUnit}`
        : `${days} ${timeUnit} ${t("common.time.ago")}`;
    }

    const weeks = Math.trunc(diffInMinutes / 10080);
    const timeUnit =
      weeks === 1 ? t("common.time.week") : t("common.time.weeks");
    return isArabic
      ? `${t("common.time.ago")} ${weeks} ${timeUnit}`
      : `${weeks} ${timeUnit} ${t("common.time.ago")}`;
  };

  return (
    <time dateTime={timestamp} className={className}>
      {handleTimeAgo(timestamp)}
    </time>
  );
};

export default TimeStamp;
