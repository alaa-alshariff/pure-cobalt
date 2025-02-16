/**
 * Google Recaptcha Response type.
 *
 * @see https://developers.google.com/recaptcha/docs/verify
 */

export type VerifyRecaptchaResponse = {
  success: boolean;
  hostname: string;
  challenge_ts: string;
  'error-codes'?: string[];
};
