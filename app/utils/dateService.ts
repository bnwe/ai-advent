/**
 * DateService provides date-related utilities for the advent calendar.
 * Handles door unlock logic based on current date and December dates.
 */

export interface DateService {
  getCurrentDate(): Date;
  isDoorUnlocked(doorDay: number, currentDate: Date): boolean;
  isDecember(date: Date): boolean;
}

/**
 * Gets the current system date.
 * Handles invalid system dates by returning a safe fallback.
 * 
 * @returns Current Date object, or a date far in the past if system date is invalid
 * 
 * Requirements: 2.1
 */
export function getCurrentDate(): Date {
  try {
    const date = new Date();
    
    // Validate the date is valid
    if (isNaN(date.getTime())) {
      // If system date is corrupted, return a date far in the past
      // This will cause all doors to be locked (safe default)
      console.error('Invalid system date detected, defaulting to all doors locked');
      return new Date(1970, 0, 1); // January 1, 1970
    }
    
    return date;
  } catch (error) {
    // If Date constructor fails, return safe fallback
    console.error('Error getting current date:', error);
    return new Date(1970, 0, 1); // January 1, 1970
  }
}

/**
 * Determines if a door should be unlocked based on the current date.
 * A door is unlocked if the current date is on or after December {doorDay}.
 * 
 * The logic handles year boundaries intelligently:
 * - Before December (Jan-Nov): all doors locked (waiting for this year's December)
 * - During December: doors unlock on their designated day
 * - After December (next Jan-Nov): all doors unlocked (from previous December)
 * 
 * Edge cases handled:
 * - Year boundaries: January-November after December shows all doors unlocked
 * - Invalid dates: Returns false for invalid door days or corrupted dates
 * - Environment override: If NEXT_PUBLIC_DISABLE_DATE_CHECK is 'true', all valid doors are unlocked
 * 
 * @param doorDay - The day number of the door (1-24)
 * @param currentDate - The current date to check against
 * @returns true if the door should be unlocked, false otherwise
 * 
 * Requirements: 2.1, 2.2, 2.3
 */
export function isDoorUnlocked(doorDay: number, currentDate: Date): boolean {
  // Validate door day is in valid range
  if (doorDay < 1 || doorDay > 24 || !Number.isInteger(doorDay)) {
    return false;
  }

  // Handle invalid/corrupted dates - default to locked
  if (!(currentDate instanceof Date) || isNaN(currentDate.getTime())) {
    return false;
  }

  // Check if date checking is disabled via environment variable
  if (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_DISABLE_DATE_CHECK === 'true') {
    return true;
  }

  const currentMonth = currentDate.getMonth(); // 0-indexed (0 = January, 11 = December)
  const currentYear = currentDate.getFullYear();

  // December is month 11 (0-indexed), January is 0, February is 1
  const DECEMBER = 11;
  const JANUARY = 0;
  const FEBRUARY = 1;

  // Determine which December to compare against
  let targetYear = currentYear;
  
  // If we're in January or February, we're in the "aftermath" of the previous December
  // All doors from that December should be unlocked
  if (currentMonth === JANUARY || currentMonth === FEBRUARY) {
    targetYear = currentYear - 1;
  }
  // If we're in March-November, we're waiting for this year's December
  // Doors should be locked
  else if (currentMonth < DECEMBER) {
    // We're before December of current year, so doors are locked
    return false;
  }
  // If we're in December (currentMonth === DECEMBER), use current year

  // Create the unlock date for this door
  const unlockDate = new Date(targetYear, DECEMBER, doorDay);

  // Door is unlocked if current date is on or after the unlock date
  return currentDate >= unlockDate;
}

/**
 * Checks if a given date is in December.
 * @param date - The date to check
 * @returns true if the date is in December, false otherwise
 */
export function isDecember(date: Date): boolean {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return false;
  }
  return date.getMonth() === 11; // December is month 11 (0-indexed)
}

// Default export as an object implementing the interface
const dateService: DateService = {
  getCurrentDate,
  isDoorUnlocked,
  isDecember,
};

export default dateService;
