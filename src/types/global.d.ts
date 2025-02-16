/**
 * Types and interfaces declared here will be merged with the global types.
 *
 * Useful for javascript only dependencies.
 */

/**
 * Fix SCSS imports in TypeScript.
 */

declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}

/**
 * Fix image imports in TypeScript.
 *
 * @see https://stackoverflow.com/a/63885623/6328218
 */

declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.webp";

/**
 * Fix SVG imports in TypeScript.
 *
 * @see https://react-svgr.com/docs/next/#typescript
 */

declare module "*.svg" {
  import type { FC, SVGProps } from "react";
  const content: FC<SVGProps<SVGElement>>;
  export default content;
}

/**
 * Ensure that `next-intl` is type-safe.
 *
 * @see https://next-intl-docs.vercel.app/docs/workflows/typescript
 */

type Messages = typeof import("@/i18n/en").default;

// declare interface IntlMessages extends Messages {}
type IntlMessages = Messages;
