import { List, Item, Sub } from '@radix-ui/react-navigation-menu';

import { NavItem } from "./NavItem";
import { NavRoute } from '../../NavRoutes';
import classNames from 'classnames';
import { useRouter } from 'next/router';

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

  return (
    <Item className={classNames('flex flex-col gap-y-1', className)}>
      <div className="leading-6 font-semibold text-xs text-darkMidGray">
        {title}
      </div>
      <Sub>
        <List className="flex flex-col gap-y-1">
          {navRoutes.map(({ route, icon }) => (
            <NavItem key={route} href={route} active={router.asPath === route}>
              <div className="flex gap-x-2 items-center">
                {icon}
                {route}
              </div>
            </NavItem>
          ))}
        </List>
      </Sub>
    </Item>
  );
};