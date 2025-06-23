import { DateRange, DateRangePreset } from './types';

/**
 * Formats a date according to the specified format
 * @param date The date to format
 * @param format The format string (e.g., "dd/MM/yyyy")
 * @returns The formatted date string or empty string if date is invalid
 */
export const formatDate = (date: Date, format: string): string => {
  if (!date || !isValidDate(date)) return '';
  
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return format
    .replace('dd', day)
    .replace('MM', month)
    .replace('yyyy', year.toString())
    .replace('HH', hours)
    .replace('mm', minutes);
};

/**
 * Parses a date string according to the specified format
 * @param dateString The date string to parse
 * @param format The format string
 * @returns The parsed date or null if invalid
 */
export const parseDate = (dateString: string, format: string): Date | null => {
  try {
    const formatParts = format.split(/[^a-zA-Z]/);
    const dateParts = dateString.split(/[^0-9]/);
    
    if (formatParts.length !== dateParts.length) return null;

    let day = 1, month = 1, year = new Date().getFullYear(), hours = 0;
    const minutes = 0;
    
    formatParts.forEach((part, index) => {
      const value = parseInt(dateParts[index]);
      if (isNaN(value)) return null;
      
      switch (part.toLowerCase()) {
        case 'dd': day = value; break;
        case 'mm': month = value; break;
        case 'yyyy': year = value; break;
        case 'hh': hours = value; break;
        default: break;
      }
    });

    const date = new Date(year, month - 1, day, hours, minutes);
    return isValidDate(date) ? date : null;
  } catch {
    return null;
  }
};

/**
 * Checks if a date is valid
 * @param date The date to check
 * @returns True if the date is valid
 */
export const isValidDate = (date: Date): boolean => {
  return date instanceof Date && !isNaN(date.getTime());
};

/**
 * Formats time in 12-hour format
 * @param date The date to format
 * @returns The formatted time string
 */
export const formatTimeIn12Hour = (date: Date): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 === 0 ? 12 : hours % 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};

/**
 * Formats a date range for display
 * @param range The date range to format
 * @param showTime Whether to include time in the formatted string
 * @returns The formatted date range string
 */
export const formatDateRange = (range: DateRange, showTime: boolean = false): string => {
  if (!range.startDate) {
    return '';
  }

  const startFormat = showTime ? 'dd/MM/yyyy, HH:mm' : 'dd/MM/yyyy';
  const endFormat = showTime ? 'dd/MM/yyyy, HH:mm' : 'dd/MM/yyyy';

  const start = formatDate(range.startDate, startFormat);

  if (!range.endDate) {
    return start;
  }

  const end = formatDate(range.endDate, endFormat);
  return `${start} – ${end}`;
};

/**
 * Gets a date range based on a preset
 * @param preset The preset to get the range for
 * @returns The date range for the preset
 */
export const getPresetDateRange = (preset: DateRangePreset): DateRange => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  switch (preset) {
    case DateRangePreset.TODAY: {
      return { startDate: today, endDate: today };
    }
    
    case DateRangePreset.YESTERDAY: {
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      return { startDate: yesterday, endDate: yesterday };
    }
    
    case DateRangePreset.TOMORROW: {
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      return { startDate: tomorrow, endDate: tomorrow };
    }
    
    case DateRangePreset.LAST_1_HOUR: {
      const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
      return { startDate: oneHourAgo, endDate: now };
    }
    
    case DateRangePreset.LAST_6_HOURS: {
      const sixHoursAgo = new Date(now.getTime() - 6 * 60 * 60 * 1000);
      return { startDate: sixHoursAgo, endDate: now };
    }
    
    case DateRangePreset.LAST_7_DAYS: {
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
      return { startDate: sevenDaysAgo, endDate: today };
    }
    
    case DateRangePreset.LAST_30_DAYS: {
      const thirtyDaysAgo = new Date(today);
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 29);
      return { startDate: thirtyDaysAgo, endDate: today };
    }
    
    case DateRangePreset.LAST_3_MONTHS: {
      const threeMonthsAgo = new Date(today);
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      return { startDate: threeMonthsAgo, endDate: today };
    }
    
    case DateRangePreset.LAST_12_MONTHS: {
      const twelveMonthsAgo = new Date(today);
      twelveMonthsAgo.setFullYear(twelveMonthsAgo.getFullYear() - 1);
      return { startDate: twelveMonthsAgo, endDate: today };
    }
    
    case DateRangePreset.NEXT_7_DAYS: {
      const sevenDaysLater = new Date(today);
      sevenDaysLater.setDate(sevenDaysLater.getDate() + 6);
      return { startDate: today, endDate: sevenDaysLater };
    }
    
    case DateRangePreset.NEXT_30_DAYS: {
      const thirtyDaysLater = new Date(today);
      thirtyDaysLater.setDate(thirtyDaysLater.getDate() + 29);
      return { startDate: today, endDate: thirtyDaysLater };
    }
    
    case DateRangePreset.NEXT_3_MONTHS: {
      const threeMonthsLater = new Date(today);
      threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);
      return { startDate: today, endDate: threeMonthsLater };
    }
    
    case DateRangePreset.NEXT_12_MONTHS: {
      const twelveMonthsLater = new Date(today);
      twelveMonthsLater.setFullYear(twelveMonthsLater.getFullYear() + 1);
      return { startDate: today, endDate: twelveMonthsLater };
    }
    
    default: {
      return { startDate: today, endDate: today };
    }
  }
};

/**
 * Gets a label for a preset
 * @param preset The preset to get the label for
 * @returns The label for the preset
 */
export const getPresetLabel = (preset: DateRangePreset): string => {
  switch (preset) {
    case DateRangePreset.TODAY: return 'Today';
    case DateRangePreset.YESTERDAY: return 'Yesterday';
    case DateRangePreset.TOMORROW: return 'Tomorrow';
    case DateRangePreset.LAST_1_HOUR: return 'Last 1 hour';
    case DateRangePreset.LAST_6_HOURS: return 'Last 6 hours';
    case DateRangePreset.LAST_7_DAYS: return 'Last 7 days';
    case DateRangePreset.LAST_30_DAYS: return 'Last 30 days';
    case DateRangePreset.LAST_3_MONTHS: return 'Last 3 months';
    case DateRangePreset.LAST_12_MONTHS: return 'Last 12 months';
    case DateRangePreset.NEXT_7_DAYS: return 'Next 7 days';
    case DateRangePreset.NEXT_30_DAYS: return 'Next 30 days';
    case DateRangePreset.NEXT_3_MONTHS: return 'Next 3 months';
    case DateRangePreset.NEXT_12_MONTHS: return 'Next 12 months';
    case DateRangePreset.CUSTOM: return 'Custom';
    default: return 'Select Range';
  }
};

/**
 * Formats time string to HH:MM format
 * @param time The time string to format
 * @returns The formatted time string
 */
export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':');
  const h = parseInt(hours) || 0;
  const m = parseInt(minutes) || 0;
  
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
};

/**
 * Validates a time string
 * @param time The time string to validate
 * @returns True if the time is valid
 */
export const isValidTime = (time: string): boolean => {
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
};

/**
 * Converts a date to string with optional time
 * @param date The date to convert
 * @param includeTime Whether to include time
 * @param timeFormat The time format to use
 * @returns The formatted date string
 */
export const dateToString = (date: Date, includeTime?: boolean, timeFormat?: string): string => {
  const dateStr = formatDate(date, 'dd/MM/yyyy');
  
  if (includeTime && timeFormat) {
    const timeStr = formatDate(date, timeFormat);
    return `${dateStr} ${timeStr}`;
  }
  
  return dateStr;
};

/**
 * Checks if two dates are the same day
 * @param date1 First date
 * @param date2 Second date
 * @returns True if dates are the same day
 */
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
};

/**
 * Checks if a date is within a range
 * @param date The date to check
 * @param startDate Range start date
 * @param endDate Range end date
 * @returns True if date is in range
 */
export const isDateInRange = (date: Date, startDate: Date, endDate: Date): boolean => {
  const dateTime = date.getTime();
  const startTime = startDate.getTime();
  const endTime = endDate.getTime();
  
  return dateTime >= startTime && dateTime <= endTime;
};

/**
 * Gets the number of days in a month
 * @param year The year
 * @param month The month (0-based)
 * @returns The number of days in the month
 */
export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

/**
 * Gets the first day of the month (0 = Sunday)
 * @param year The year
 * @param month The month (0-based)
 * @returns The day of the week (0-6)
 */
export const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay();
};

/**
 * Generates a calendar grid for a month
 * @param year The year
 * @param month The month (0-based)
 * @returns Array of weeks, each containing day numbers or null for empty cells
 */
export const generateCalendarGrid = (year: number, month: number): (number | null)[][] => {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  
  const weeks: (number | null)[][] = [];
  let currentWeek: (number | null)[] = [];
  
  // Fill empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    currentWeek.push(null);
  }
  
  // Fill in the days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    currentWeek.push(day);
    
    // If we've filled a week (7 days), start a new week
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }
  
  // Fill remaining empty cells in the last week
  while (currentWeek.length > 0 && currentWeek.length < 7) {
    currentWeek.push(null);
  }
  
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }
  
  return weeks;
};
