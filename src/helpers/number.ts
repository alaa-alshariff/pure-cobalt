/**
 * Count the number of decimals in a number.
 *
 * @param value - The number to count the decimals of.
 *
 * @returns The number of decimals in the number.
 */

export const countDecimals = (value: number): number => {
  if (Math.floor(value) === value) return 0;

  return value.toString().split('.')[1]?.length || 0;
};
