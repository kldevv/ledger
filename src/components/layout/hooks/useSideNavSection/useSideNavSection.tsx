import { useTranslation } from 'next-i18next'

import { route } from '@/shared/route'

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
          label: t`sideNavSection.item.home`,
          icon: 'Home',
        },
        {
          href: route.branch.home,
          label: t`sideNavSection.item.branches`,
          icon: 'Squares2x2',
        },
        {
          href: route.link.home,
          label: t`sideNavSection.item.links`,
          icon: 'GlobeAlt',
        },
      ],
    },
    {
      id: 'b0f223f0-6c5c-43d3-842d-d6764c945f2b',
      title: t`sideNavSection.title.journal`,
      items: [
        {
          href: route.journal.home,
          label: t`sideNavSection.item.journals`,
          icon: 'ReceiptPercent',
        },
        {
          href: route.entry.home,
          label: t`sideNavSection.item.entries`,
          icon: 'Bookmark',
        },
      ],
    },
    {
      id: '804f333a-b435-4c13-b7dd-62d7b00932d7',
      title: t`sideNavSection.title.branch`,
      items: [
        {
          href: route.account.home,
          label: t`sideNavSection.item.accounts`,
          icon: 'Wallet',
        },
        {
          href: route.accountGroup.home,
          label: t`sideNavSection.item.accountGroups`,
          icon: 'Folder',
        },
        {
          href: route.tag.home,
          label: t`sideNavSection.item.tags`,
          icon: 'Tag',
        },
      ],
    },
    {
      id: '9755af24-b6bb-4249-a683-2ff65e60d194',
      title: t`sideNavSection.title.summary`,
      items: [
        {
          href: route.summary.totalOverMonths,
          label: t`sideNavSection.item.totalOverMonths`,
          icon: 'DocumentChartBar',
        },
      ],
    },
    {
      id: 'b502c7dc-2f2e-4654-ab75-9be6dec137b2',
      title: t`sideNavSection.title.help`,
      items: [
        {
          href: route.core.about,
          label: t`sideNavSection.item.about`,
          icon: 'Language',
        },
      ],
    },
  ]
}
