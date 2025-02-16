import clsx from 'clsx';
import {
  type CSSProperties,
  type ComponentPropsWithoutRef,
  createElement,
  forwardRef,
} from 'react';

import { getResponsiveClasses } from '@/helpers/styles';
import type { ColorAndTheme, ResponsiveStyle, SpacingProps, Theme, Width } from '@/types/styles';

import styles from './index.module.scss';

/**
 * Supported container nodes.
 */

export type ContainerNode =
  | 'div'
  | 'section'
  | 'main'
  | 'article'
  | 'header'
  | 'footer'
  | 'aside'
  | 'ul'
  | 'ol'
  | 'nav'
  | 'figure'
  | 'figcaption'
  | 'form'
  | 'fieldset';

// Helper type to omit the default hidden prop.
// Makes it easier to read the BaseContainerProps below.

type DivPropsWithoutHidden = Omit<ComponentPropsWithoutRef<'div'>, 'hidden'>;

// Helper type to define the border direction.

export type BorderDirection = 'top' | 'right' | 'bottom' | 'left' | 'all';

/**
 * BaseContainer component props.
 *
 * Notes:
 * - This type can be extended in other containers to inherit the props.
 * - We omit the default hidden prop to use our own instead.
 */

export type BaseContainerProps = SpacingProps &
  DivPropsWithoutHidden & {
    /**
     * The HTML element to use for the container.
     *
     * @example <BaseContainer as="section" />
     */
    as?: ContainerNode;

    /**
     * The theme to use for the container.
     *
     * Any child component will be styled based on this theme thanks to CSS variables.
     */
    theme?: Theme;

    /**
     * The width of the container.
     *
     * Can be a number between 1 and 12, or a responsive object with breakpoints as keys.
     *
     * @example
     * <BaseContainer width={6} />
     * <BaseContainer width={{ xs: 12, lg: 6 }} />
     */
    width?: ResponsiveStyle<Width>;

    /**
     * The border to apply to the container.
     *
     * @example <BaseContainer border="left" paddingLeft="xs" />
     */
    border?: ResponsiveStyle<BorderDirection>;

    /**
     * Whether to hide the container.
     *
     * A boolean can be provided to hide the container at all breakpoints.
     * A responsive object can be provided to hide the container at specific breakpoints.
     *
     * @example
     * <BaseContainer hidden={true} />
     * <BaseContainer hidden={{ xs: true, lg: false }} />
     */
    hidden?: ResponsiveStyle<boolean>;

    /**
     * The background color of the container.
     *
     * Independant of the theme, this will override the theme's background color.
     */
    backgroundColor?: ColorAndTheme;
  };

// Instead of repeating the spacing props, we can loop through them.

const spacingProps = [
  'padding',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
  'margin',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
] as const;

/**
 * BaseContainer component.
 *
 * This component should be used as a base for other containers.
 * Doing so will ensure that all containers have the same base properties (e.g. spacing).
 *
 * Note: `forwardRef` is used to make it compatible with other components like Radix and Craft.js.
 */

export const BaseContainer = forwardRef<HTMLDivElement, BaseContainerProps>((props, ref) => {
  const {
    as = 'div',
    theme,
    width,
    border,
    hidden,
    backgroundColor,
    children,
    className,
    style,
    ...rest
  } = props;

  // Preparing the responsive classes.
  // Used when a prop needs to change depending on the breakpoint.
  // i.e. hidden = { xs: false, lg: true }

  const globalResponsiveClasses: string[] = [...getResponsiveClasses('width', width)];

  const responsiveClasses = [
    ...getResponsiveClasses('border', border),
    ...getResponsiveClasses('hidden', hidden),
  ];

  const inlineStyles: CSSProperties = { ...style };

  // If a spacing number is provided, we add it as an inline style.
  // Otherwise, we add a responsive class based on the value.
  // Finally, we remove the prop from the rest to avoid passing it to the div.

  spacingProps.forEach((prop) => {
    const value = props[prop];

    if (typeof value === 'number') {
      inlineStyles[prop] = `${value}px`;
    } else {
      const responsiveValue = getResponsiveClasses(prop, value);
      globalResponsiveClasses.push(...responsiveValue);
    }

    delete rest[prop];
  });

  const classes = clsx(
    styles.baseContainer,
    theme && `theme-${theme}`,
    border && styles.border,
    backgroundColor && `bg-${backgroundColor}`,
    responsiveClasses.map((className) => styles[className]),
    globalResponsiveClasses.map((className) => className),
    className
  );

  return createElement(as, { ref, className: classes, style: inlineStyles, ...rest }, children);
});

// A display name is required when using `forwardRef` to make it easier to debug with React DevTools.

BaseContainer.displayName = 'BaseContainer';

export default BaseContainer;
