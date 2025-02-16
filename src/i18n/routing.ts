import { defineRouting } from 'next-intl/routing';

import { AVAILABLE_LOCALES, DEFAULT_LOCALE } from '.';

/**
 * Defining and exporting the i18n routing configuration.
 *
 * Used for the navigation wrappers and the `next-intl` middleware.
 *
 * @see https://next-intl-docs.vercel.app/docs/getting-started/app-router/with-i18n-routing#i18n-routing
 */

export const routingConfig = defineRouting({
  locales: AVAILABLE_LOCALES,
  localePrefix: 'as-needed', // Ensure the locale is optional for the default locale.
  defaultLocale: DEFAULT_LOCALE,
});
