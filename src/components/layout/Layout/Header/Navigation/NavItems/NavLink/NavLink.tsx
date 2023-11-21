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
        className="NavigationMenuLink"
        active={isActive}
        {...props}
      />
    </NextLink>
  );
};
