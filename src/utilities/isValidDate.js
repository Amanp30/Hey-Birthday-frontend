import { monthsFullArray } from "./AllArrays";

/**
 * Validates if a date is valid.
 * @param {Object} dateObj - An object with year, month, and date.
 * @returns {boolean} True if the date is valid, false otherwise.
 */
const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export function isValidDate(dateObj) {
  const year = parseInt(dateObj.year);
  const month = parseInt(dateObj.month);
  const day = parseInt(dateObj.date);

  // Check if the year is missing or 0
  if (!year) {
    const maxDays = daysInMonth[month - 1];
    const monthName = monthsFullArray[month - 1];

    if (day > maxDays) {
      throw new Error(
        `Invalid date. ${monthName} cannot have more than ${maxDays} days.`
      );
    }
  }

  // Check if year is provided
  if (year) {
    // Create a Date object with the provided values
    const date = new Date(year, month - 1, day);

    // Check if the Date object is valid
    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      day >= 1 &&
      day <= new Date(year, month, 0).getDate()
    );
  }

  return true; // Invalid date if the year is missing or 0
}
