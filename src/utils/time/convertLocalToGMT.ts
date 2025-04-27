/** ----------------------------------------------
 * Converts a local datetime string to GMT (UTC) time.
 * 
 * @param {string} localTime - A local datetime string in the format "yy-mm-dd hh:mm:ss".
 * @param {"time" | "datetime"} [format="time"] - The format of the returned GMT time string.
 * Can be "time" for "hh:mm:ss" or "datetime" for "yy-mm-dd hh:mm:ss".
 * @returns {string} A GMT time string in the specified format.
---------------------------------------------- */

function convertLocalToGMT(
  localTime: string,
  format: "time" | "datetime" = "time",
): string {
  const localDate = new Date(localTime);

  let gmtTimeString: string;
  if (format === "time") {
    gmtTimeString = localDate.toISOString().slice(11, 19); // Extract hh:mm:ss
  } else if (format === "datetime") {
    const gmtDateString = localDate.toISOString().slice(0, 10); // Extract yyyy-mm-dd
    const gmtTime = localDate.toISOString().slice(11, 19); // Extract hh:mm:ss
    gmtTimeString = `${gmtDateString} ${gmtTime}`;
  } else {
    gmtTimeString = localDate.toISOString().slice(11, 19); // Default fallback to time format
  }

  return gmtTimeString ?? "";
}

export default convertLocalToGMT;
