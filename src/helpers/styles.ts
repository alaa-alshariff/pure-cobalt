import type { ActiveBreakpoints } from '@/contexts/responsive';
import { getObjectKeys } from '@/helpers/typescript';
import type { ColorOrInline, ResponsiveStyle, Spacing } from '@/types/styles';

/**
 * Returns an array of classes for a given responsive style (e.g. { xs: A, sm: B, md: C }).
 *
 * @param name - the name of the class.
 * @param style - a style property or a responsive style object.
 *
 * @returns an array of responsive classes.
 */

export const getResponsiveClasses = <T>(name: string, style?: ResponsiveStyle<T>): string[] => {
  if (!style) return [];

  switch (typeof style) {
    case 'boolean':
      return [style && name];

    case 'string':
    case 'number':
      return [`${name}-${style}`];

    case 'object':
      return getObjectKeys(style as object).map((breakpoint) => {
        if (typeof style[breakpoint] === 'boolean') {
          return style[breakpoint] && `${name}-${breakpoint}`;
        }

        return `${name}-${breakpoint}-${style[breakpoint]}`;
      });

    default:
      return [];
  }
};

/**
 * Returns an inline style property based on the min-width active breakpoints.
 *
 * Should be used with the useMediaQueries hook (responsive context).
 *
 * @param style - a style property or a responsive style object.
 * @param minWidth - the state of the active minimum breakpoints.
 *
 * @returns the style property or the responsive style property based on the active breakpoints.
 */

export const getResponsiveInlineStyle = <T>(
  style: ResponsiveStyle<T>,
  minWidth: ActiveBreakpoints
): T | undefined => {
  if (!style) return undefined;
  switch (typeof style) {
    case 'string':
    case 'number':
      return style;

    case 'object':
      let currentStyle;
      getObjectKeys(style as object).forEach((breakpoint) => {
        if (minWidth[breakpoint]) currentStyle = style[breakpoint];
      });
      return currentStyle;

    default:
      return undefined;
  }
};

/**
 * Returns `true` if the value is a inline color value.
 *
 * @param value - a color variable string or inline color value.
 *
 * @returns `true` if the value is a inline color value.
 */

export const isInlineColorValue = <Color = ColorOrInline>(value?: Color) => {
  return (
    value &&
    typeof value === 'string' &&
    (value.startsWith('rgb') || value.startsWith('#') || value.startsWith('transparent'))
  );
};

/**
 * Returns a color class string if the value is not inline.
 *
 * @param value - a color variable string or inline color value.
 *
 * @returns a color class string if the value is not inline.
 *
 * @example getColorClass('blue-1') // returns 'color-blue-1'
 */

export const getColorClass = (value?: ColorOrInline) => {
  const isInlined = isInlineColorValue(value);
  return !isInlined ? `color-${value}` : undefined;
};

/**
 * Returns an inline color value if the value is inline.
 *
 * @param value - a color variable string or inline color value.
 *
 * @returns inline color value if the value is inline.
 *
 * @example getColorStyle('#FFFFFF') // returns '#FFFFFF'
 */

export const getColorStyle = <Color = ColorOrInline>(value?: Color) => {
  const isInlined = isInlineColorValue(value);
  return isInlined ? value : undefined;
};

/**
 * Returns the computed value of a CSS spacing variable in pixels.
 *
 * @param spacing - the spacing value (e.g. 'xs', 'md', 'lg', etc.)
 *
 * @returns the computed pixel value of the CSS variable or a default fallback value.
 *
 * @example getSpacingValue('md') // returns computed value of --spacing-md
 */

export const getSpacingValue = (spacing: Spacing): number => {
  if (typeof window === 'undefined') return 0;

  const propertyValue = getComputedStyle(document.documentElement)
    .getPropertyValue(`--spacing-${spacing}`)
    .trim();

  const spacingValue = parseFloat(propertyValue) * 16;

  return spacingValue;
};
