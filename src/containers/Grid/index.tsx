import clsx from 'clsx';
import { type CSSProperties, forwardRef } from 'react';

import { BaseContainer, type BaseContainerProps } from '@/containers/BaseContainer';
import { getResponsiveClasses } from '@/helpers/styles';
import type { Alignment, ResponsiveStyle, Spacing } from '@/types/styles';

import styles from './index.module.scss';

/**
 * The amount of supported grid rows and columns.
 */

export type GridSize = 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Supported grid justify values.
 */

export type GridJustify = Alignment | 'space-between' | 'space-around';

/**
 * Supported grid alignment values.
 */

export type GridAlignment = Alignment | 'stretch';

/**
 * Grid container component props.
 *
 * Based on the BaseContainer props.
 */

export type GridProps = BaseContainerProps & {
  /**
   * The gap between the grid items.
   *
   * Can be a spacing value or a number (applied as an inline style).
   *
   * @example
   * <Grid gap="md" />
   * <Grid gap={20} />
   * <Grid gap={{ xs: 'sm', lg: 'md' }} />
   */
  gap?: ResponsiveStyle<Spacing> | number;

  /**
   * The row gap between the grid items.
   *
   * Can be a spacing value or a number (applied as an inline style).
   *
   * @example
   * <Grid rowGap="md" />
   * <Grid rowGap={20} />
   * <Grid rowGap={{ xs: 'sm', lg: 'md' }} />
   */
  rowGap?: ResponsiveStyle<Spacing> | number;

  /**
   * The column gap between the grid items.
   *
   * Can be a spacing value or a number (applied as an inline style).
   *
   * @example
   * <Grid columnGap="md" />
   * <Grid columnGap={20} />
   * <Grid columnGap={{ xs: 'sm', lg: 'md' }} />
   */
  columnGap?: ResponsiveStyle<Spacing> | number;

  /**
   * The `align-items` property of the grid container.
   *
   * A responsive object with breakpoints as keys is also supported.
   *
   * @example
   * <Grid align="center" />
   * <Grid align={{ xs: 'center', lg: 'start' }} />
   */
  align?: ResponsiveStyle<GridAlignment>;

  /**
   * The `justify-items` property of the grid container.
   *
   * A responsive object with breakpoints as keys is also supported.
   *
   * @example
   * <Grid justify="center" />
   * <Grid justify={{ xs: 'center', lg: 'start' }} />
   */
  justify?: ResponsiveStyle<GridJustify>;

  /**
   * The amount of rows in the grid.
   *
   * Can be a number or a responsive object with breakpoints as keys.
   *
   * @example
   * <Grid rows={3} />
   * <Grid rows={{ xs: 3, lg: 6 }} />
   */
  rows?: ResponsiveStyle<GridSize>;

  /**
   * The amount of columns in the grid.
   *
   * Can be a number or a responsive object with breakpoints as keys.
   *
   * @example
   * <Grid columns={3} />
   * <Grid columns={{ xs: 3, lg: 6 }} />
   */
  columns?: ResponsiveStyle<GridSize>;
};

/**
 * Grid container component.
 *
 * Note: `forwardRef` is used to make it compatible with other components like Radix.
 */

const Grid = forwardRef<HTMLDivElement, GridProps>((props, ref) => {
  const {
    gap,
    rowGap,
    columnGap,
    align,
    justify,
    rows,
    columns,
    children,
    className,
    style,
    ...rest
  } = props;

  // Preparing the responsive classes.
  // Used when a prop needs to change depending on the breakpoint.
  // i.e. columns = { xs: 1, lg: 3 }
  const responsiveClasses = [
    ...getResponsiveClasses('rows', rows),
    ...getResponsiveClasses('columns', columns),
    ...getResponsiveClasses('align', align),
    ...getResponsiveClasses('justify', justify),
  ];

  const classes = clsx(
    'grid',
    styles.grid,
    gap && typeof gap !== 'number' && getResponsiveClasses('gap', gap),
    rowGap && typeof rowGap !== 'number' && getResponsiveClasses('rowGap', rowGap),
    columnGap && typeof columnGap !== 'number' && getResponsiveClasses('columnGap', columnGap),
    responsiveClasses.map((className) => styles[className]),
    className
  );

  const inlineStyles: CSSProperties = {
    gap: gap && typeof gap === 'number' ? `${gap}px` : undefined,
    rowGap: rowGap && typeof rowGap === 'number' ? `${rowGap}px` : undefined,
    columnGap: columnGap && typeof columnGap === 'number' ? `${columnGap}px` : undefined,
    ...style,
  };

  return (
    <BaseContainer ref={ref} className={classes} style={inlineStyles} {...rest}>
      {children}
    </BaseContainer>
  );
});

// A display name is required when using `forwardRef` to make it easier to debug with React DevTools.

Grid.displayName = 'Grid';

/**
 * Grid item component props.
 */

export type GridItemProps = BaseContainerProps & {
  align?: ResponsiveStyle<GridAlignment>;
  justify?: ResponsiveStyle<GridJustify>;
};

/**
 * Grid item component.
 *
 * Can be used to easily set `align`, and `justify` properties without CSS.
 *
 * Note: `forwardRef` is used to make it compatible with other components like Radix.
 */

export const GridItem = forwardRef<HTMLDivElement, GridItemProps>((props, ref) => {
  const { align, justify, children, className, ...rest } = props;

  const responsiveClasses = [
    ...getResponsiveClasses('align', align),
    ...getResponsiveClasses('justify', justify),
  ];

  const classes = clsx(
    styles.gridItem,
    responsiveClasses.map((className) => styles[className]),
    className
  );

  return (
    <BaseContainer ref={ref} className={classes} {...rest}>
      {children}
    </BaseContainer>
  );
});

// A display name is required when using `forwardRef` to make it easier to debug with React DevTools.

GridItem.displayName = 'GridItem';

/**
 * Defining a namespace for the Grid component.
 *
 * This is important, since it enables us to use forwardRef and have other components inside.
 * We use Object.assign instead of = because TypeScript does not like it with forwardRef.
 *
 * @see https://stackoverflow.com/a/68678190/6328218
 *
 * @example
 * <Grid>
 *   <Grid.Item>...</Grid.Item>
 * </Grid>
 */

const GridNamespace = Object.assign(Grid, { Item: GridItem });

export { GridNamespace as Grid };

export default GridNamespace;
