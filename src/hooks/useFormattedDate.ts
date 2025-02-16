import { useFormatter } from 'next-intl';

/**
 * Custom hook to format a date into a human-readable string.
 *
 * Also handles the case where the date is undefined, so it easier to conditionally render.
 *
 * @param date - The date to format.
 *
 * @returns The formatted date string.
 */

export const useFormattedDate = (date?: string | number | Date) => {
  const format = useFormatter();

  if (!date) return undefined;

  const dateObj = new Date(date);

  return format.dateTime(dateObj, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
