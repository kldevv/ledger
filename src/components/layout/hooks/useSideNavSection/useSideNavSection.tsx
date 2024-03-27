import { useTranslation } from 'next-i18next'

import { route } from '@/shared'

import type { SideNavSectionProps } from '../../presentationals/SideNav/SideNav.Section/SideNav.Section'

type SideNavSection = SideNavSectionProps & {
  id: string
}

export const useSideNavSection = (): SideNavSection[] => {
  const { t } = useTranslation('layout')

  return [
    {
      id: 'd73c75e9-67c0-4acb-be78-6a0934b1c15c',
      items: [
        {
          href: route.core.home,
          label: t`hooks.sideNavSection.item.home`,
          icon: 'Home',
        },
        {
          href: route.branch.home,
          label: t`hooks.sideNavSection.item.branches`,
          icon: 'Squares2x2',
        },
        {
          href: route.link.home,
          label: t`hooks.sideNavSection.item.links`,
          icon: 'GlobeAlt',
        },
      ],
    },
    {
      id: 'b0f223f0-6c5c-43d3-842d-d6764c945f2b',
      title: t`hooks.sideNavSection.title.journal`,
      items: [
        {
          href: route.journal.home,
          label: t`hooks.sideNavSection.item.journals`,
          icon: 'ReceiptPercent',
        },
        {
          href: route.entry.home,
          label: t`hooks.sideNavSection.item.entries`,
          icon: 'Bookmark',
        },
      ],
    },
    {
      id: '804f333a-b435-4c13-b7dd-62d7b00932d7',
      title: t`hooks.sideNavSection.title.branch`,
      items: [
        {
          href: route.account.home,
          label: t`hooks.sideNavSection.item.accounts`,
          icon: 'Wallet',
        },
        {
          href: route.accountGroup.home,
          label: t`hooks.sideNavSection.item.accountGroups`,
          icon: 'Folder',
        },
        {
          href: route.tag.home,
          label: t`hooks.sideNavSection.item.tags`,
          icon: 'Tag',
        },
        {
          href: route.summary.home,
          label: t`hooks.sideNavSection.item.summary`,
          icon: 'DocumentChartBar',
        },
      ],
    },
    {
      id: 'b502c7dc-2f2e-4654-ab75-9be6dec137b2',
      title: t`hooks.sideNavSection.title.info`,
      items: [
        {
          href: route.core.about,
          label: t`hooks.sideNavSection.item.about`,
          icon: 'Language',
        },
      ],
    },
  ]
}
