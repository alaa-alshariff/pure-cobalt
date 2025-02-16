import { createNavigation } from 'next-intl/navigation';
import { type ComponentProps, forwardRef } from 'react';

import { isExternalURL } from '@/helpers/url';

import { routingConfig } from './routing';

/**
 * Defining `next-intl` wrappers for Next.js.
 *
 * Uses the shared pathnames navigation strategy.
 * This would need to be updated if we change to the localized pathnames strategy.
 *
 * @see https://next-intl-docs.vercel.app/docs/routing/navigation#shared-pathnames
 */

const { Link, redirect, permanentRedirect, usePathname, useRouter } =
  createNavigation(routingConfig);

/**
 * Wrapper around `next-intl` Link component to handle external links automatically.
 */

const WrappedLink = forwardRef<HTMLAnchorElement, ComponentProps<typeof Link>>((props, ref) => {
  const { href, target, children, ...rest } = props;

  const isExternal = isExternalURL(href);

  return (
    <Link
      ref={ref}
      href={href}
      target={target || (isExternal ? '_blank' : undefined)}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      {...rest}
    >
      {children}
    </Link>
  );
});

// A display name is required when using `forwardRef` to make it easier to debug with React DevTools.

WrappedLink.displayName = 'Link';

/**
 * Exporting the `next-intl` wrappers and the custom `Link` component.
 */

export { WrappedLink as Link, redirect, permanentRedirect, usePathname, useRouter };
