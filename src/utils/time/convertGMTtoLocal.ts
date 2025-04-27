/** ----------------------------------------------
* Converts a GMT (UTC) datetime string to local time, based on user's system/browser time.
 * 
 * @param {string} GMTTime - A GMT datetime string in the format "yy-mm-dd hh:mm:ss".
 * @param {"time" | "datetime"} [format="time"] - The format of the returned local time string. 
 * Can be "time" for "hh:mm:ss" or "datetime" for "yy-mm-dd hh:mm:ss".
 * @returns {string} A local time string in the specified format.
----------------------------------------------*/

function convertGMTtoLocal(
  GMTTime: string,
  format: "time" | "datetime" = "time",
): string {
  const gmtDate = new Date(`${GMTTime}Z`);

  let localTimeString: string;
  if (format === "time") {
    localTimeString = gmtDate.toLocaleTimeString([], {
      hour12: false,
      timeStyle: "medium",
    });
  } else if (format === "datetime") {
    const localDateString = gmtDate.toLocaleDateString("en-CA"); // en-CA format gives yyyy-mm-dd
    const localTime = gmtDate.toLocaleTimeString([], {
      hour12: false,
      timeStyle: "medium",
    });
    localTimeString = `${localDateString} ${localTime}`;
  } else {
    localTimeString = gmtDate.toLocaleTimeString([], {
      hour12: false,
      timeStyle: "medium",
    }); // Default fallback
  }

  return localTimeString ?? "";
}

export default convertGMTtoLocal;
