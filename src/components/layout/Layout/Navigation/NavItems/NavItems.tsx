import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { NavLink } from './NavLink';
import { route } from '@/lib/route';

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
      {
        navItems.map(({key, path}) => {
          return (
            <NavigationMenu.Item key={key}>
              <NavLink
                className="font-semibold leading-6 text-sm p-2 flex gap-x-3"
                href={path}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  className='w-6 h-6'
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                  ></path>
                </svg>
                {t(`navItems.label.${key}`)}
              </NavLink>
            </NavigationMenu.Item>
          );
        })
      }
    </>
  )
};
