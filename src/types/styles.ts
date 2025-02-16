/**
 * Available breakpoints for responsive styles, containers, etc.
 */

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Type definition for the responsive style object.
 *
 * Used to easily type a property that can be a single value or a record of values with breakpoints as keys.
 *
 * @example
 * type Props = {
 *   gap?: ResponsiveStyle<Spacing> | number;
 * }
 *
 * const Component = ({ gap }: Props) => (...);
 *
 * <Component gap={2} />
 * <Component gap={{ xs: 2, md: 4 }} />
 */

export type ResponsiveStyle<T> = T | { [key in Breakpoint]?: T };

/**
 * Available spacing values for padding, margin, gap, etc.
 */

export type Spacing = 'none' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

/**
 * Record of spacing properties to avoid repetition in containers.
 */

export type SpacingProps = {
  /**
   * The padding of the container.
   *
   * Can be a spacing value or a number (applied as an inline style).
   *
   * @example
   * <BaseContainer padding="md" />
   * <BaseContainer padding={20} />
   * <BaseContainer padding={{ xs: 'sm', lg: 'md' }} />
   */
  padding?: ResponsiveStyle<Spacing> | number;

  /**
   * The padding top of the container.
   *
   * Can be a spacing value or a number (applied as an inline style).
   *
   * @example
   * <BaseContainer paddingTop="md" />
   * <BaseContainer paddingTop={20} />
   * <BaseContainer paddingTop={{ xs: 'sm', lg: 'md' }} />
   */
  paddingTop?: ResponsiveStyle<Spacing> | number;

  /**
   * The padding right of the container.
   *
   * Can be a spacing value or a number (applied as an inline style).
   *
   * @example
   * <BaseContainer paddingRight="md" />
   * <BaseContainer paddingRight={20} />
   * <BaseContainer paddingRight={{ xs: 'sm', lg: 'md' }} />
   */
  paddingRight?: ResponsiveStyle<Spacing> | number;

  /**
   * The padding bottom of the container.
   *
   * Can be a spacing value or a number (applied as an inline style).
   *
   * @example
   * <BaseContainer paddingBottom="md" />
   * <BaseContainer paddingBottom={20} />
   * <BaseContainer paddingBottom={{ xs: 'sm', lg: 'md' }} />
   */
  paddingBottom?: ResponsiveStyle<Spacing> | number;

  /**
   * The padding left of the container.
   *
   * Can be a spacing value or a number (applied as an inline style).
   *
   * @example
   * <BaseContainer paddingLeft="md" />
   * <BaseContainer paddingLeft={20} />
   * <BaseContainer paddingLeft={{ xs: 'sm', lg: 'md' }} />
   */
  paddingLeft?: ResponsiveStyle<Spacing> | number;

  /**
   * The margin of the container.
   *
   * Can be a spacing value or a number (applied as an inline style).
   *
   * @example
   * <BaseContainer margin="md" />
   * <BaseContainer margin={20} />
   * <BaseContainer margin={{ xs: 'sm', lg: 'md' }} />
   */
  margin?: ResponsiveStyle<Spacing> | number;

  /**
   * The margin top of the container.
   *
   * Can be a spacing value or a number (applied as an inline style).
   *
   * @example
   * <BaseContainer marginTop="md" />
   * <BaseContainer marginTop={20} />
   * <BaseContainer marginTop={{ xs: 'sm', lg: 'md' }} />
   */
  marginTop?: ResponsiveStyle<Spacing> | number;

  /**
   * The margin right of the container.
   *
   * Can be a spacing value or a number (applied as an inline style).
   *
   * @example
   * <BaseContainer marginRight="md" />
   * <BaseContainer marginRight={20} />
   * <BaseContainer marginRight={{ xs: 'sm', lg: 'md' }} />
   */
  marginRight?: ResponsiveStyle<Spacing> | number;

  /**
   * The margin bottom of the container.
   *
   * Can be a spacing value or a number (applied as an inline style).
   *
   * @example
   * <BaseContainer marginBottom="md" />
   * <BaseContainer marginBottom={20} />
   * <BaseContainer marginBottom={{ xs: 'sm', lg: 'md' }} />
   */
  marginBottom?: ResponsiveStyle<Spacing> | number;

  /**
   * The margin left of the container.
   *
   * Can be a spacing value or a number (applied as an inline style).
   *
   * @example
   * <BaseContainer marginLeft="md" />
   * <BaseContainer marginLeft={20} />
   * <BaseContainer marginLeft={{ xs: 'sm', lg: 'md' }} />
   */
  marginLeft?: ResponsiveStyle<Spacing> | number;
};

/**
 * Type definition for the available section heights.
 */

export type SectionHeight = 'primary' | 'secondary' | 'tertiary' | 'quaternary';

/**
 * Available width values for containers (based on a 12-column grid).
 */

export type Width = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

/**
 * Available alignment values for containers (e.g. Flex, Grid, etc.).
 */

export type Alignment = 'start' | 'center' | 'end';

/**
 * Available text alignment values for typography.
 */

export type TextAlignment = 'left' | 'center' | 'right' | 'justify';

/**
 * Available text transform values for typography.
 */

export type TextTransform = 'uppercase' | 'lowercase' | 'capitalize';

/**
 * Available font weight values for typography.
 */

export type FontWeight = 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold';

/**
 * Available theme values for containers.
 */

export type Theme = 'white' | 'grey-1' | 'grey-10' | 'grey-11' | 'black';

/**
 * Available color values for typography, backgrounds, etc.
 */

export type Color =
  | 'white'
  | 'grey-1'
  | 'grey-2'
  | 'grey-3'
  | 'grey-4'
  | 'grey-5'
  | 'grey-6'
  | 'grey-7'
  | 'grey-8'
  | 'grey-9'
  | 'grey-10'
  | 'grey-11'
  | 'black'
  | 'aqua-1'
  | 'aqua-2'
  | 'aqua-3'
  | 'aqua-4'
  | 'aqua-5'
  | 'aqua-6'
  | 'aqua-7'
  | 'terra-1'
  | 'terra-2'
  | 'terra-3'
  | 'terra-4'
  | 'terra-5'
  | 'terra-6'
  | 'beige-1'
  | 'beige-2'
  | 'orange-1'
  | 'orange-2'
  | 'red-1'
  | 'red-2'
  | 'red-3';

/**
 * Available color values with theme support.
 */

export type ColorAndTheme = Color | 'theme' | 'transparent';

/**
 * Helper type for color properties using the CSS `rgb` function.
 */

export type RGB = `rgb(${number}, ${number}, ${number})`;

/**
 * Helper type for color properties using the CSS `rgba` function.
 */

export type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;

/**
 * Helper type for hex color properties.
 */

export type HEX = `#${string}`;

/**
 * Helper type for color properties that can be predefined, RGB, RGBA, HEX or transparent.
 */

export type ColorOrInline = Color | RGB | RGBA | HEX | 'transparent' | 'inherit';

/**
 * Available orientation values.
 */

export type Orientation = 'vertical' | 'horizontal' | 'inline';
