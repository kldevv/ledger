import clsx from 'clsx'
import Link from 'next/link'
import { forwardRef } from 'react'

import type { LinkProps } from 'next/link'

export interface LinkCoreProps extends React.PropsWithChildren<LinkProps> {
  /**
   * Class name?
   */
  className?: string
  /**
   * Loading
   */
  loading?: boolean
}

export const LinkCore = forwardRef<HTMLAnchorElement, LinkCoreProps>(
  ({ className, loading = false, ...props }, ref) => {
    return (
      <Link
        {...props}
        ref={ref}
        role="link"
        aria-disabled={loading}
        className={clsx(
          'whitespace-nowrap text-nowrap',
          { 'pointer-events-none cursor-default': loading },
          className,
        )}
      />
    )
  },
)

LinkCore.displayName = 'Link.Core'
