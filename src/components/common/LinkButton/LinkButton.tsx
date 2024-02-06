import Link from 'next/link'

import type { UrlObject } from 'url'

export interface LinkButtonProps {
  /**
   * Href
   */
  href: string | UrlObject
  /**
   * Label
   */
  label: string
}

export const LinkButton: React.FC<LinkButtonProps> = ({ href, label }) => {
  return (
    <div className="w-full text-right">
      <Link
        href={href}
        className="text-light-accent hover:bg-light-accent-halo rounded-md p-1 text-xs font-medium leading-6"
      >
        {label}
      </Link>
    </div>
  )
}
