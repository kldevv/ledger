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
}

export const TextLink: React.FC<TextLinkProps> = ({ children, href }) => {
  return (
    <Link href={href} className="text-light-accent hover:text-light-accent/80">
      {children}
    </Link>
  )
}
