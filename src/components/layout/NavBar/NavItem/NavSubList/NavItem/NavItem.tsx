import Link from 'next/link';

import { Item, Link as MenuLink } from '@radix-ui/react-navigation-menu';
import { UrlObject } from 'url';

export type NavItemProps = {
  /**
   * Is active
   */
  active: boolean
  /**
   * Client-side routing link
   */
  href: string | UrlObject;
  /**
   * Children component
   */
  children: React.ReactNode;
}

export const NavItem: React.FC<NavItemProps> = ({ active, href, children }) => {
  // See more: https://www.radix-ui.com/primitives/docs/components/navigation-menu#with-client-side-routing
  return (
    <Item>
      <Link href={href} passHref legacyBehavior>
        <MenuLink
          active={active}
          className="font-semibold leading-6 text-sm py-1 px-3 flex gap-x-3 rounded-md text-dark-shades hover:bg-mid-gray data-[active]:bg-mid-gray data-[active]:text-main"
        >
          {children}
        </MenuLink>
      </Link>
    </Item>
  );
};

