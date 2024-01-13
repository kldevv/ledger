import {
  List as ReactNavigatioMenuList,
  Item as ReactNavigatioMenuItem,
  Sub as ReactNavigatioMenuSub,
} from '@radix-ui/react-navigation-menu'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { NavigationBarItemLink } from '..'

import type { Route } from '@/lib'

export interface SideNavigationBarMenuProps {
  /**
   * List of item group
   */
  groups: SideNavigationBarMenuItemGroup[]
}

export type SideNavigationBarMenuItemGroup = {
  /**
   * Item group title
   */
  groupTitleTranslateKey: string
  /**
   * Items of the group
   */
  items: SideNavigationBarMenuItem[]
}

export type SideNavigationBarMenuItem = Route & {
  /**
   * Key for the icon component
   */
  iconKey: string
}

export const SideNavigationBarMenu: React.FC<SideNavigationBarMenuProps> = ({
  groups,
}) => {
  const { t } = useTranslation('route')
  const { pathname: currentPathname } = useRouter()

  return (
    <div className="flex flex-col w-full space-y-8 px-4 pt-6">
      {groups.map(({ groupTitleTranslateKey, items }) => (
        <ReactNavigatioMenuItem
          key={groupTitleTranslateKey}
          className={'flex flex-col gap-y-1'}
        >
          <div className="leading-6 font-semibold text-xs text-gray">
            {t(groupTitleTranslateKey)}
          </div>
          <ReactNavigatioMenuSub>
            <ReactNavigatioMenuList className="flex flex-col gap-y-1">
              {items.map(({ titleTranslateKye, pathname, query }) => (
                <div key={pathname} className="mx-2">
                  <NavigationBarItemLink
                    href={{
                      pathname,
                      query,
                    }}
                    active={currentPathname === pathname}
                  >
                    <div className="flex gap-x-2 items-center font-medium text-base">
                      {t(titleTranslateKye)}
                    </div>
                  </NavigationBarItemLink>
                </div>
              ))}
            </ReactNavigatioMenuList>
          </ReactNavigatioMenuSub>
        </ReactNavigatioMenuItem>
      ))}
    </div>
  )
}
