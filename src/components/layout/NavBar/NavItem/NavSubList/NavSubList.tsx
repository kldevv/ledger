import { List, Item, Sub } from '@radix-ui/react-navigation-menu';

import { NavItem } from "./NavItem";
import { NavRoute } from '../../NavRoutes';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

export type NavSubList = {
  /**
   * Nav sub list title
   */
  title: string,
  /**
   * List of nav routes
   */
  navRoutes: NavRoute[]
  /**
   * Customize class name
   */
  className?: string
}

export const NavSubList: React.FC<NavSubList> = ({
  title,
  navRoutes,
  className,
}) => {
  const router = useRouter()
  const { t } = useTranslation('layout')

  return (
    <Item className={classNames('flex flex-col gap-y-1', className)}>
      <div className="leading-6 font-semibold text-xs text-gray">
        {title}
      </div>
      <Sub>
        <List className="flex flex-col gap-y-1">
          {navRoutes.map(({ route, icon }) => (
            <NavItem
              key={route}
              href={route}
              active={router.asPath.startsWith(route)}
            >
              <div className="flex gap-x-2 items-center">
                {icon}
                {t(`nav-bar.nav-sub-list.label.${route}`)}
              </div>
            </NavItem>
          ))}
        </List>
      </Sub>
    </Item>
  );
};