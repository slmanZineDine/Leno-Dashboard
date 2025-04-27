function convertTo12Hour(hour: number, minute: number): string {
  const period = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12; // Convert 0 to 12 for midnight and 13-23 to 1-11 for PM
  return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")} ${period}`;
}

export default convertTo12Hour;
