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

    if (diffInMinutes < 1) return "الآن";
    if (diffInMinutes < 60) return `منذ ${Math.trunc(diffInMinutes)} دقيقة`;
    if (diffInMinutes < 1440)
      return `منذ ${Math.trunc(diffInMinutes / 60)} ساعة`;
    if (diffInMinutes < 10080)
      return `منذ ${Math.trunc(diffInMinutes / 1440)} أيام`;
    return `منذ ${Math.trunc(diffInMinutes / 10080)} أسابيع`;
  };

  return (
    <time dateTime={timestamp} className={className}>
      {handleTimeAgo(timestamp)}
    </time>
  );
};

export default TimeStamp;
