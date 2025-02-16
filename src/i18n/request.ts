import { getRequestConfig } from 'next-intl/server';
import 'server-only';

import { AVAILABLE_LOCALES, LOCALES } from '.';
import EN_DICTIONARY from './en';
import FR_DICTIONARY from './fr';

// Define a dictionary of messages with each locale.

const MESSAGES = {
  [LOCALES.EN]: EN_DICTIONARY,
  [LOCALES.FR]: FR_DICTIONARY,
};

/**
 * Get the request configuration for `next-intl` (used in `next.config.js`).
 *
 * @see https://next-intl-docs.vercel.app/docs/getting-started/app-router#i18nts
 */

const requestConfig = getRequestConfig(async ({ requestLocale }) => {
  let locale = (await requestLocale) as LOCALES;

  // Validate that the incoming `locale` parameter is valid.
  if (!locale || !AVAILABLE_LOCALES.includes(locale)) {
    locale = LOCALES.EN;
  }

  return {
    locale,
    messages: MESSAGES[locale],
  };
});

export default requestConfig;
