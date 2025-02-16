import blocks from "./blocks";

import footer from "./footer";
import forms from "./forms";
import header from "./header";

import pages from "./pages";

/**
 * Shared English messages.
 *
 * Contains default messages for type-safety and fallback.
 */

const EN_COMMONS_MESSAGES = {
  pages,
  header,
  footer,

  forms,

  blocks,

  locales: {
    en: {
      language: "English",
    },
    fr: {
      language: "Français",
    },
  },
  error: {
    unexpected: "An unexpected error occurred. Please try again later.",
  },
};

export default EN_COMMONS_MESSAGES;
