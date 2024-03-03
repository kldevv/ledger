import {
  Item as ReactNavigatioMenuItem,
  Link as ReactNavigatioMenuLink,
} from '@radix-ui/react-navigation-menu'
import Link from 'next/link'

import type { UrlObject } from 'url'

export type NavigationBarItemLinkProps = {
  /**
   * Is active
   */
  active: boolean
  /**
   * Client-side routing href
   */
  href: string | UrlObject
  /**
   * Children component
   */
  children: React.ReactNode
}

export const NavigationBarItemLink: React.FC<NavigationBarItemLinkProps> = ({
  active,
  href,
  children,
}) => {
  // See more: https://www.radix-ui.com/primitives/docs/components/navigation-menu#with-client-side-routing
  return (
    <ReactNavigatioMenuItem>
      <Link href={href} passHref legacyBehavior>
        <ReactNavigatioMenuLink
          active={active}
          className="text-dark-shades hover:bg-light-shades data-[active]:bg-light-shades flex space-x-3 text-ellipsis whitespace-nowrap rounded-md px-3 py-1"
        >
          {children}
        </ReactNavigatioMenuLink>
      </Link>
    </ReactNavigatioMenuItem>
  )
}
