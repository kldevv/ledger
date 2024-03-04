import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { route } from '@/shared'

import type { SectionProps } from '../presentationals/SideNavBar/SideNavBar.Section/Section'

export const useSideNavSection = () => {
  const { t } = useTranslation('layout')

  const sections = useMemo<SectionProps[]>(
    () => [
      {
        items: [
          {
            href: route.home,
            label: t`hooks.sideNavSection.item.home`,
            icon: 'Home',
          },
          {
            href: route.treasuryBookHome,
            label: t`hooks.sideNavSection.item.treasuryBooks`,
            icon: 'Squares2x2',
          },
        ],
      },
      {
        title: t`hooks.sideNavSection.title.activities`,
        items: [
          {
            href: route.transactionHome,
            label: t`hooks.sideNavSection.item.transactions`,
            icon: 'ReceiptPercent',
          },
          {
            href: route.entryHome,
            label: t`hooks.sideNavSection.item.entries`,
            icon: 'Bookmark',
          },
          {
            href: route.exchangeHome,
            label: t`hooks.sideNavSection.item.exchange`,
            icon: 'ArrowRightLeft',
          },
        ],
      },
      {
        title: t`hooks.sideNavSection.title.branch`,
        items: [
          {
            href: route.accountHome,
            label: t`hooks.sideNavSection.item.accounts`,
            icon: 'Wallet',
          },
          {
            href: route.categoryHome,
            label: t`hooks.sideNavSection.item.categories`,
            icon: 'Folder',
          },
          {
            href: route.tagHome,
            label: t`hooks.sideNavSection.item.tags`,
            icon: 'Tag',
          },
          {
            href: route.reportAmountBalance,
            label: t`hooks.sideNavSection.item.reports`,
            icon: 'DocumentChartBar',
          },
        ],
      },
    ],
    [t],
  )

  return sections
}
