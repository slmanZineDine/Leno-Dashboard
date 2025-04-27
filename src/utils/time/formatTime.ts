import convertGMTtoLocal from "./convertGMTtoLocal";
import convertTo12Hour from "./convertTo12Hour";

function formatTime(dateTime: string) {
  const time = convertGMTtoLocal(dateTime, "datetime")?.split(" ")?.[1];
  if (time) {
    const [hour, minutes] = time.split(":");
    return convertTo12Hour(+hour, +minutes);
  }
  return "";
}

export default formatTime;
