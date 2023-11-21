import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { NavLink } from './NavLink';

type NavItem = {
  /**
   * Navigation item label
   */
  label: string;
  /**
   * Navigation item label
   */
  path: string;
};

const navItems: NavItem[] = [
  {
    label: 'Transactions',
    path: '/transaction',
  },
  {
    label: 'Statement',
    path: '/statement',
  },
  {
    label: 'Accounts',
    path: '/account',
  },
  {
    label: 'Users',
    path: '/user',
  },
  {
    label: 'Tags',
    path: '/tag'
  }
];

export const NavItems: React.FC = () => {
  return (
    <>
      <NavigationMenu.Item key={'/'}>
        <NavLink href={'/'}>{'Home'}</NavLink>
      </NavigationMenu.Item>
      {
        navItems.map(({label, path}) => {
          return (
            <NavigationMenu.Item key={path}>
              <NavLink href={path}>{label}</NavLink>
            </NavigationMenu.Item>
          )
        })
      }
    </>
  )
};
