import {
  List as ReactNavigatioMenuList,
  Item as ReactNavigatioMenuItem,
  Sub as ReactNavigatioMenuSub,
} from '@radix-ui/react-navigation-menu'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { NavigationBarItemLink } from '..'

import type { Route } from '@/shared'

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
   * Item icon
   */
  icon: React.ReactNode
}

export const SideNavigationBarMenu: React.FC<SideNavigationBarMenuProps> = ({
  groups,
}) => {
  const { t } = useTranslation('route')
  const { pathname: currentPathname } = useRouter()

  return (
    <div className="flex w-full flex-col space-y-8">
      {groups.map(({ groupTitleTranslateKey, items }) => (
        <ReactNavigatioMenuItem
          key={groupTitleTranslateKey}
          className={'flex flex-col gap-y-1'}
        >
          <div className="text-gray text-xs font-semibold leading-6">
            {t(groupTitleTranslateKey)}
          </div>
          <ReactNavigatioMenuSub>
            <ReactNavigatioMenuList className="flex flex-col gap-y-1">
              {items.map(({ pathname, query, icon }) => (
                <div key={pathname} className="mx-1">
                  <NavigationBarItemLink
                    href={{
                      pathname,
                      query,
                    }}
                    active={currentPathname === pathname}
                  >
                    <div className="flex items-center gap-x-2 text-sm font-medium leading-6">
                      {icon}
                      {t(`${pathname}.title`)}
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
