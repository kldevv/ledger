import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

interface NavLinkProps
  extends Omit<NavigationMenu.NavigationMenuLinkProps, 'href'> {
  /**
   * Url of the link
   */
  href: string
}

/**
 * Navigation menu link wrapper component for client side routing
 * See more: https://www.radix-ui.com/primitives/docs/components/navigation-menu#with-client-side-routing
 */
export const NavLink: React.FC<NavLinkProps> = ({ href, ...props }) => {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <NextLink href={href} passHref legacyBehavior>
      <NavigationMenu.Link
        className="flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        active={isActive}
        {...props}
      />
    </NextLink>
  );
};
