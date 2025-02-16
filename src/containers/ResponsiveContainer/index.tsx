import clsx from 'clsx';
import { type CSSProperties, type ReactNode, forwardRef } from 'react';

import { Flex, type FlexProps } from '../Flex';
import styles from './index.module.scss';

/**
 * Responsive container component props.
 *
 * Based on the FlexProps properties.
 */

export type ResponsiveContainerProps = Omit<FlexProps, 'width'> & {
  /**
   * Whether the container should take the full width of the viewport.
   */
  fluid?: boolean;

  /**
   * The horizontal alignment of the content.
   */
  horizontalAlignment?: FlexProps['align'];

  /**
   * The vertical alignment of the content.
   */
  verticalAlignment?: FlexProps['justify'];

  /**
   * The children to render outside the content container.
   *
   * Elements rendered here should be positioned absolutely.
   */
  outsideChildren?: ReactNode;

  /**
   * The class name to apply to the content container.
   */
  contentClassName?: string;

  /**
   * The style to apply to the content container.
   */
  contentStyle?: CSSProperties;
};

/**
 * Responsive container component.
 *
 * Handles the responsiveness based on the viewport width.
 */

export const ResponsiveContainer = forwardRef<HTMLDivElement, ResponsiveContainerProps>(
  (props, ref) => {
    const {
      as = 'div',
      fluid = false,
      theme = 'white',
      paddingTop = 'xl',
      paddingBottom = 'xl',
      paddingLeft = 'none',
      paddingRight = 'none',
      horizontalAlignment,
      verticalAlignment,
      children,
      outsideChildren,
      className,
      contentClassName,
      contentStyle,
      ...rest
    } = props;

    const classes = clsx(styles.responsiveContainer, fluid && styles.fluid, className);
    const contentClasses = clsx(styles.content, 'h-100', contentClassName);

    return (
      <Flex
        as={as}
        ref={ref}
        width={12}
        theme={theme}
        direction="column"
        paddingTop={paddingTop}
        paddingBottom={paddingBottom}
        paddingLeft={paddingLeft}
        paddingRight={paddingRight}
        className={classes}
        {...rest}
      >
        <Flex
          width={12}
          align={horizontalAlignment}
          justify={verticalAlignment}
          direction="column"
          className={contentClasses}
          style={contentStyle}
        >
          {children}
        </Flex>
        {outsideChildren}
      </Flex>
    );
  }
);

// A display name is required when using `forwardRef` to make it easier to debug with React DevTools.

ResponsiveContainer.displayName = 'ResponsiveContainer';

export default ResponsiveContainer;
