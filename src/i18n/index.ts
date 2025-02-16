/**
 * Enum of the available locales.
 *
 * Useful when used in a data structure or logic statement.
 * By using an enum, we minimize the impact of potential locale changes in the future.
 */

export enum LOCALES {
  EN = 'en',
  FR = 'fr',
}

/**
 * Array of all available locales.
 */

export const AVAILABLE_LOCALES = Object.values(LOCALES);

/**
 * Default locale constant.
 */

export const DEFAULT_LOCALE = LOCALES.EN;

/**
 * Get the home alias for a given locale.
 *
 * @param locale - The locale to get the home alias for.
 *
 * @returns The home alias for the given locale.
 */

export const getHomeAliasByLocale = (locale: LOCALES) => {
  switch (locale) {
    case LOCALES.FR:
      return '/accueil';
    default:
      return '/home';
  }
};

/**
 * Type definition of the alternates object.
 *
 * This type is voluntarily simple, as TypeScript is not able to infer the key properly.
 */

export type Alternates = Record<string, string>;

/**
 * Object with the default alternates for each non-regionalized locale.
 */

export const DEFAULT_ALTERNATES = {
  [LOCALES.EN]: '/',
  [LOCALES.FR]: '/',
};
