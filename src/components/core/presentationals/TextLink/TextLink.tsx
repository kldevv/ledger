import classNames from 'classnames'
import Link from 'next/link'

import type { UrlObject } from 'url'

export interface TextLinkProps {
  /**
   * Text
   */
  children?: string
  /**
   * Link href
   */
  href: string | UrlObject
  /**
   * Intent
   */
  intent?: 'section' | 'table'
}

export const TextLink: React.FC<TextLinkProps> = ({
  children,
  href,
  intent = 'section',
}) => {
  return (
    <Link
      href={href}
      className={classNames(
        'font-medium',
        intent === 'section'
          ? 'text-light-accent hover:text-light-accent/80'
          : 'text-dark-shades hover:text-dark-shades/80',
      )}
    >
      {children}
    </Link>
  )
}
