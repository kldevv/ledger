import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { route } from '@/shared'

import type { SectionProps } from '../../presentationals/SideNavBar/SideNavBar.Section/Section'

export const useSideNavSection = () => {
  const { t } = useTranslation('layout')

  const sections = useMemo<SectionProps[]>(
    () => [
      {
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
        ],
      },
      {
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
        title: t`hooks.sideNavSection.title.feature`,
        items: [
          {
            href: route.xjournal.home,
            label: t`hooks.sideNavSection.item.xjournals`,
            icon: 'ArrowRightLeft',
          },
        ],
      },
      {
        title: t`hooks.sideNavSection.title.info`,
        items: [
          {
            href: route.core.about,
            label: t`hooks.sideNavSection.item.about`,
            icon: 'Language',
          },
        ],
      },
    ],
    [t],
  )

  return sections
}
