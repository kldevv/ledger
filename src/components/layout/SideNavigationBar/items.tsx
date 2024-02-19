import {
  ArrowsRightLeftIcon,
  ChartPieIcon,
  ClipboardDocumentIcon,
  InboxIcon,
  InboxStackIcon,
  ListBulletIcon,
  PresentationChartBarIcon,
  ReceiptPercentIcon,
  TagIcon,
} from '@heroicons/react/24/outline'

import { route } from '@/shared'

import type {
  SideNavigationBarMenuItem,
  SideNavigationBarMenuItemGroup,
} from '..'

const iconCn = 'w-5 h-5'

const mainGroupItems: SideNavigationBarMenuItem[] = [
  {
    ...route.transactionHome,
    icon: <ReceiptPercentIcon className={iconCn} />,
  },
  {
    ...route.entryHome,
    icon: <ListBulletIcon className={iconCn} />,
  },
]

const reportGroupItems: SideNavigationBarMenuItem[] = [
  {
    ...route.reportAmountBalance,
    icon: <ChartPieIcon className={iconCn} />,
  },
  {
    ...route.reportAmountChange,
    icon: <PresentationChartBarIcon className={iconCn} />,
  },
]

const treasuryBookGroupItems: SideNavigationBarMenuItem[] = [
  {
    ...route.accountHome,
    icon: <InboxIcon className={iconCn} />,
  },
  {
    ...route.categoryHome,
    icon: <InboxStackIcon className={iconCn} />,
  },
  {
    ...route.tagHome,
    icon: <TagIcon className={iconCn} />,
  },
]

const settingsGroupItems: SideNavigationBarMenuItem[] = [
  {
    ...route.exchangeHome,
    icon: <ArrowsRightLeftIcon className={iconCn} />,
  },
  {
    ...route.treasuryBookHome,
    icon: <ClipboardDocumentIcon className={iconCn} />,
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
