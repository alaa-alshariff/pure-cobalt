import type { Breakpoint } from '@/types/styles';

import { ResponsiveProvider, useMediaQueries } from './provider';

/**
 * Type definition for an object with the active status of each breakpoint.
 */

export type ActiveBreakpoints = Record<Breakpoint, boolean>;

/**
 *  Mobile-first breakpoints.
 */

export const breakpoints: Record<Breakpoint, number> = {
  xs: 0,
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1440,
};

export { ResponsiveProvider, useMediaQueries };
