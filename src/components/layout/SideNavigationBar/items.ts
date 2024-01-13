import { route } from '@/lib'

import type {
  SideNavigationBarMenuItem,
  SideNavigationBarMenuItemGroup,
} from '..'

const mainGroupItems: SideNavigationBarMenuItem[] = [
  {
    ...route.treasuryBookHome,
    iconKey: '',
  },
]

const settingGroupItems: SideNavigationBarMenuItem[] = [
  {
    ...route.treasuryBookAdd,
    iconKey: '',
  },
]

export const navigatorGroups: SideNavigationBarMenuItemGroup[] = [
  {
    groupTitleTranslateKey: 'layout:SideNavigationBarMenu.groupTitle.main',
    items: settingGroupItems,
  },
  {
    groupTitleTranslateKey: 'layout:SideNavigationBarMenu.groupTitle.settings',
    items: mainGroupItems,
  },
]
