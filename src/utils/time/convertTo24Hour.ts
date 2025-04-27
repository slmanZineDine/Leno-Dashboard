function convertTo24Hour(
  hour: number,
  minute: number,
  period: "AM" | "PM",
): string {
  if (period === "PM" && hour !== 12) {
    hour += 12;
  } else if (period === "AM" && hour === 12) {
    hour = 0;
  }
  return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:00`;
}
export default convertTo24Hour;
