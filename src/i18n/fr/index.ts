import blocks from "./blocks";

import footer from "./footer";
import forms from "./forms";
import header from "./header";

import pages from "./pages";

/**
 * Shared French messages.
 *
 * Contains default messages for type-safety and fallback.
 */

const FR_COMMONS_MESSAGES = {
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
    unexpected:
      "Une erreur inattendue s’est produite. Veuillez réessayer plus tard.",
  },
};

export default FR_COMMONS_MESSAGES;
