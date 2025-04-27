/** ----------------------------------------------
 * Formats a Date object into a string with the format yyyy-mm-dd.
 * 
 * @param {Date} date - The date object to be formatted.
 * @returns {string} The formatted date string.
 * 
 * @example
 * const formattedDate = formatDate(new Date());
 * console.log(formattedDate); // Outputs: 2023-10-20
 ---------------------------------------------- */

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default formatDate;
