import classNames from 'classnames'
import NextLink from 'next/link'

import type { UrlObject } from 'url'

export interface LinkProps {
  /**
   * Link href
   */
  href: string | UrlObject
  /**
   * Link label
   */
  label: string
  /**
   * Link style variant
   */
  variant?: 'primary'
  /**
   * Override class name
   */
  className?: string
}

export const Link: React.FC<LinkProps> = ({ href, label, className }) => {
  return (
    <NextLink
      href={href}
      className={classNames(
        'bg-light-accent text-light-shades hover:bg-light-accent/90 whitespace-nowrap rounded-md px-4 py-2 text-xs font-semibold min-w-max w-fit',
        className,
      )}
    >
      {label}
    </NextLink>
  )
}
