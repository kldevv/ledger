import * as NavigationMenu from '@radix-ui/react-navigation-menu';

import { useRouter } from 'next/router';
import Link from 'next/link';

export type NavLink = {
  /**
   * Client-side routing link
   */
  href: string;
  /**
   * Children component
   */
  children: React.ReactNode;
};

export const NavLink: React.FC<NavLink> = ({ href, children }) => {
  const router = useRouter();

  const isActive = router.asPath === href

  // See more: https://www.radix-ui.com/primitives/docs/components/navigation-menu#with-client-side-routing
  return (
    <Link href={href} passHref legacyBehavior>
      <NavigationMenu.Link
        active={isActive}
        className="font-semibold leading-6 text-sm py-1 px-3 flex gap-x-3 rounded-md text-darkShades hover:bg-midGray data-[active]:bg-midGray data-[active]:text-main"
      >
        {children}
      </NavigationMenu.Link>
    </Link>
  );
};
