import {
  ChartPieIcon,
  ClipboardDocumentIcon,
  InboxIcon,
  InboxStackIcon,
  ListBulletIcon,
  PresentationChartBarIcon,
  ReceiptPercentIcon,
  TagIcon,
} from '@heroicons/react/24/outline'

import { route } from '@/lib'

import type {
  SideNavigationBarMenuItem,
  SideNavigationBarMenuItemGroup,
} from '..'

const mainGroupItems: SideNavigationBarMenuItem[] = [
  {
    ...route.transactionHome,
    icon: <ReceiptPercentIcon className="w-5 h-5" />,
  },
  {
    ...route.entryHome,
    icon: <ListBulletIcon className="w-5 h-5" />,
  },
]

const reportGroupItems: SideNavigationBarMenuItem[] = [
  {
    ...route.reportAmountBalance,
    icon: <ChartPieIcon className="w-5 h-5" />,
  },
  {
    ...route.reportAmountChange,
    icon: <PresentationChartBarIcon className="w-5 h-5" />,
  },
]

const treasuryBookGroupItems: SideNavigationBarMenuItem[] = [
  {
    ...route.accountHome,
    icon: <InboxIcon className="w-5 h-5" />,
  },
  {
    ...route.categoryHome,
    icon: <InboxStackIcon className="w-5 h-5" />,
  },
  {
    ...route.tagHome,
    icon: <TagIcon className="w-5 h-5" />,
  },
]

const settingsGroupItems: SideNavigationBarMenuItem[] = [
  {
    ...route.treasuryBookHome,
    icon: <ClipboardDocumentIcon className="w-5 h-5" />,
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
    groupTitleTranslateKey:
      'layout:SideNavigationBarMenu.groupTitle.treasuryBook',
    items: treasuryBookGroupItems,
  },
  {
    groupTitleTranslateKey: 'layout:SideNavigationBarMenu.groupTitle.settings',
    items: settingsGroupItems,
  },
]
