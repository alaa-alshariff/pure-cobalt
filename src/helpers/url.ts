import type { UrlObject } from 'url';

import { DOMAIN, SCHEME } from '@/utils/constants';

/**
 * Transforms a relative URL into an absolute URL.
 *
 * @param relativeURL - The relative URL to transform.
 * @param domain - The domain to use (defaults to the API domain).
 *
 * @returns The absolute URL.
 */

export const asAbsoluteURL = (relativeURL = '', domain = DOMAIN) => {
  const url = relativeURL.toString();

  // Why are you like this?
  if (url.startsWith('http')) return url;

  // Add slash if URL is missing it.
  const leadingSlash = !url.startsWith('/') ? '/' : '';

  return `${SCHEME}://${domain}${leadingSlash}${url}`;
};

/**
 * Check if a URL is external.
 *
 * @param url - a string containing a URL.
 *
 * @returns a boolean indicating if the URL is external.
 */

export const isExternalURL = (URL?: string | UrlObject) => {
  // Adding a fallback in case the value passed is `undefined`.
  const URLString = URL ? URL.toString() : '';

  return URLString.match(/^http|mailto/) !== null;
};

/**
 * Remove the anchor from a URL.
 *
 * @param url - a string containing a URL.
 *
 * @returns a string containing the URL without the anchor.
 */

export const removeAnchor = (url: string) => {
  const anchor = url.split('#')[0];
  return anchor;
};
