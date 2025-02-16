/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * Returns an array of keys of an object.
 * This is sometimes necessary because TypeScript does not infer the type of the keys of an object.
 *
 * @param obj the object.
 *
 * @returns an array of keys of an object.
 */

export const getObjectKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>;

/**
 * Type predicate for checking if a generic is not null or undefined.
 *
 * @param value the value to check
 *
 * @returns true if the value is not null or undefined, false otherwise
 *
 * @see https://stackoverflow.com/a/46700791/6328218
 */

export const notEmpty = <TValue>(value: TValue | null | undefined): value is TValue => {
  if (value === null || value === undefined) return false;
  const testDummy: TValue = value;
  return true;
};
