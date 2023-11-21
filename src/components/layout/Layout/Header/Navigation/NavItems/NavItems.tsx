import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { NavLink } from './NavLink';
import { route } from '@/utils/route';

import { useTranslation } from 'react-i18next';

enum NavItemKey {
  TRANSACTION = 'TRANSACTION',
  STATEMENT = 'STATEMENT',
  ACCOUNT = 'ACCOUNT',
  PEOPLE = 'PEOPLE',
  GROUP = 'GROUP'
}

type NavItem = {
  /**
   * Navigation item label, translate key
   */
  key: NavItemKey;
  /**
   * Navigation item path
   */
  path: string;
};

const navItems: NavItem[] = [
  {
    key: NavItemKey.TRANSACTION,
    path: route.transaction.index,
  },
  {
    key: NavItemKey.STATEMENT,
    path: route.statement.index,
  },
  {
    key: NavItemKey.ACCOUNT,
    path: route.account.index,
  },
  {
    key: NavItemKey.PEOPLE,
    path: route.people.index,
  },
  {
    key: NavItemKey.GROUP,
    path: route.group.index,
  },
];

export const NavItems: React.FC = () => {
  const { t } = useTranslation('layout');

  return (
    <>
      <NavigationMenu.Item key={'/'}>
        <NavLink href={'/'}>{'Home'}</NavLink>
      </NavigationMenu.Item>
      {
        navItems.map(({key, path}) => {
          return (
            <NavigationMenu.Item key={key}>
              <NavLink href={path}>{t(`navItems.label.${key}`)}</NavLink>
            </NavigationMenu.Item>
          );
        })
      }
    </>
  )
};
