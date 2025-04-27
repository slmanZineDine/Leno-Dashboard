function isDateTodayOrLater(dateString: string): boolean {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return false; // Invalid date
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to the start of today
  return date >= today;
}

export default isDateTodayOrLater;
