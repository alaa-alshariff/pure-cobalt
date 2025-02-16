'use client';

import { type ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import { type ActiveBreakpoints, breakpoints } from '.';

// Defaults are mainly used for SSR (configured as a mobile screen).

const defaultMinWidth: ActiveBreakpoints = {
  xs: true,
  sm: true,
  md: true,
  lg: true,
  xl: true,
};

const defaultMaxWidth: ActiveBreakpoints = {
  xs: false,
  sm: false,
  md: false,
  lg: false,
  xl: false,
};

// Type definition for the responsive context.

type ResponsiveContextType = {
  minWidth: ActiveBreakpoints;
  maxWidth: ActiveBreakpoints;
  isReady: boolean;
};

/**
 * Context to store the active breakpoints (minWidth and maxWidth).
 *
 * @see https://reactjs.org/docs/context.html
 */

const ResponsiveContext = createContext<ResponsiveContextType>({
  minWidth: defaultMinWidth,
  maxWidth: defaultMaxWidth,
  isReady: false,
});

/**
 * Custom hook to access the responsive context.
 *
 * @returns the breakpoints and their active status (minWidth and maxWidth).
 */

export const useMediaQueries = (): ResponsiveContextType => useContext(ResponsiveContext);

// Type for the provider properties.

type Props = {
  children: ReactNode;
};

/**
 * Provider to manage the responsive context and update the active breakpoints.
 */

export const ResponsiveProvider = ({ children }: Props) => {
  const [minWidth, setMinWidth] = useState<ActiveBreakpoints>(defaultMinWidth);
  const [maxWidth, setMaxWidth] = useState<ActiveBreakpoints>(defaultMaxWidth);
  const [isReady, setisReady] = useState(false);

  const isSm = useMediaQuery({ minWidth: breakpoints.sm });
  const isMd = useMediaQuery({ minWidth: breakpoints.md });
  const isLg = useMediaQuery({ minWidth: breakpoints.lg });
  const isXl = useMediaQuery({ minWidth: breakpoints.xl });

  useEffect(() => {
    setisReady(true);
  }, []);

  useEffect(() => {
    setMinWidth({ xs: true, sm: isSm, md: isMd, lg: isLg, xl: isXl });
    setMaxWidth({ xs: !isSm, sm: !isMd, md: !isLg, lg: !isXl, xl: true });
  }, [isSm, isMd, isLg, isXl]);

  return (
    <ResponsiveContext.Provider value={{ minWidth, maxWidth, isReady }}>
      {children}
    </ResponsiveContext.Provider>
  );
};

export default ResponsiveProvider;
