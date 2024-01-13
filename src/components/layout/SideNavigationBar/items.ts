import { route } from '@/lib'

import type {
  SideNavigationBarMenuItem,
  SideNavigationBarMenuItemGroup,
} from '..'

const mainGroupItems: SideNavigationBarMenuItem[] = [
  {
    ...route.transactionHome,
    iconKey: '',
  },
  {
    ...route.entryHome,
    iconKey: '',
  },
]

const reportGroupItems: SideNavigationBarMenuItem[] = [
  {
    ...route.reportHome,
    iconKey: '',
  },
]

const settingGroupItems: SideNavigationBarMenuItem[] = [
  {
    ...route.accountHome,
    iconKey: '',
  },
  {
    ...route.categoryHome,
    iconKey: '',
  },
  {
    ...route.tagHome,
    iconKey: '',
  },
  {
    ...route.treasuryBookHome,
    iconKey: '',
  },
]

export const navigatorGroups: SideNavigationBarMenuItemGroup[] = [
  {
    groupTitleTranslateKey: 'layout:SideNavigationBarMenu.groupTitle.main',
    items: mainGroupItems,
  },
  {
    groupTitleTranslateKey: 'layout:SideNavigationBarMenu.groupTitle.reports',
    items: reportGroupItems,
  },
  {
    groupTitleTranslateKey: 'layout:SideNavigationBarMenu.groupTitle.settings',
    items: settingGroupItems,
  },
]
