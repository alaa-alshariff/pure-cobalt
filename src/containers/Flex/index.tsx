import clsx from 'clsx';
import { type CSSProperties, forwardRef } from 'react';

import { BaseContainer, type BaseContainerProps } from '@/containers/BaseContainer';
import { getResponsiveClasses } from '@/helpers/styles';
import type { Alignment, ResponsiveStyle, Spacing } from '@/types/styles';

import styles from './index.module.scss';

/**
 * Flex container component props.
 *
 * Based on the BaseContainer props.
 */

export type FlexProps = BaseContainerProps & {
  /**
   * The gap between the flex items.
   *
   * Can be a spacing value or a number (applied as an inline style).
   * A responsive object with breakpoints as keys is also supported.
   *
   * @example
   * <Flex gap="md" />
   * <Flex gap={20} />
   * <Flex gap={{ xs: 'sm', lg: 'md' }} />
   */
  gap?: ResponsiveStyle<Spacing> | number;

  /**
   * The wrap property of the flex container.
   *
   * A responsive object with breakpoints as keys is also supported.
   *
   * @example
   * <Flex wrap="wrap" />
   * <Flex wrap={{ xs: 'wrap', lg: 'nowrap' }} />
   */
  wrap?: ResponsiveStyle<'wrap' | 'nowrap' | 'wrap-reverse'>;

  /**
   * The `align-items` property of the flex container.
   *
   * A responsive object with breakpoints as keys is also supported.
   *
   * @example
   * <Flex align="center" />
   * <Flex align={{ xs: 'center', lg: 'flex-start' }} />
   */
  align?: ResponsiveStyle<Alignment | 'stretch'>;

  /**
   * The `justify-content` property of the flex container.
   *
   * A responsive object with breakpoints as keys is also supported.
   *
   * @example
   * <Flex justify="center" />
   * <Flex justify={{ xs: 'center', lg: 'flex-start' }} />
   */
  justify?: ResponsiveStyle<Alignment | 'space-between' | 'space-around' | 'space-evenly'>;

  /**
   * The `flex-direction` property of the flex container.
   *
   * A responsive object with breakpoints as keys is also supported.
   *
   * @example
   * <Flex direction="column" />
   * <Flex direction={{ xs: 'column', lg: 'row' }} />
   */
  direction?: ResponsiveStyle<'row' | 'row-reverse' | 'column' | 'column-reverse'>;
};

/**
 * Flex container component.
 *
 * Note: `forwardRef` is used to make it compatible with other components like Radix.
 */

const Flex = forwardRef<HTMLDivElement, FlexProps>((props, ref) => {
  const { gap, wrap, align, justify, direction, className, children, style, ...rest } = props;

  // Preparing the responsive classes.
  // Used when a prop needs to change depending on the breakpoint.
  // i.e. direction = { xs: 'column', lg: 'row' }
  const responsiveClasses = [
    ...getResponsiveClasses('wrap', wrap),
    ...getResponsiveClasses('align', align),
    ...getResponsiveClasses('justify', justify),
    ...getResponsiveClasses('direction', direction),
  ];

  const classes = clsx(
    styles.flex,
    responsiveClasses.map((className) => styles[className]),
    gap && typeof gap !== 'number' && getResponsiveClasses('gap', gap),
    className
  );

  const inlineStyles = {
    gap: gap && typeof gap === 'number' ? `${gap}px` : undefined,
    ...style,
  };

  return (
    <BaseContainer ref={ref} className={classes} style={inlineStyles} {...rest}>
      {children}
    </BaseContainer>
  );
});

// A display name is required when using `forwardRef` to make it easier to debug with React DevTools.

Flex.displayName = 'Flex';

/**
 * Flex item component props.
 *
 * Based on the BaseContainer props.
 */

export type FlexItemProps = BaseContainerProps & {
  grow?: CSSProperties['flexGrow'] | boolean;
  shrink?: CSSProperties['flexShrink'] | boolean;
  basis?: CSSProperties['flexBasis'];
};

/**
 * Flex item component.
 *
 * Can be used to easily set `grow`, `shrink` and `basis` properties without CSS.
 * Since its based on the BaseContainer, the spacing props are also available.
 *
 * Note: `forwardRef` is used to make it compatible with other components like Radix and Craft.js.
 */

export const FlexItem = forwardRef<HTMLDivElement, FlexItemProps>(
  ({ grow, shrink, basis, className, children, ...props }, ref) => {
    const classes = clsx(styles.flexItem, className);

    const toNumber = (v?: CSSProperties['flexGrow'] | CSSProperties['flexShrink'] | boolean) =>
      typeof v !== 'undefined' ? (v ? 1 : 0) : v;

    const inlineStyles = {
      flexGrow: toNumber(grow),
      flexShrink: toNumber(shrink),
      flexBasis: basis,
    };

    return (
      <BaseContainer ref={ref} className={classes} style={inlineStyles} {...props}>
        {children}
      </BaseContainer>
    );
  }
);

// A display name is required when using `forwardRef` to make it easier to debug with React DevTools.

FlexItem.displayName = 'FlexItem';

/**
 * Defining a namespace for the Flex component.
 *
 * This is important, since it enables us to use forwardRef and have other components inside.
 * We use Object.assign instead of = because TypeScript does not like it with forwardRef.
 *
 * @see https://stackoverflow.com/a/68678190/6328218
 *
 * @example
 * <Flex>
 *   <Flex.Item>...</Flex.Item>
 * </Flex>
 */

const FlexNamespace = Object.assign(Flex, { Item: FlexItem });

export { FlexNamespace as Flex };

export default FlexNamespace;
