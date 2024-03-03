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
            label: t`layout.sideNavSection.item.home`,
            icon: 'Home',
          },
        ],
      },
      {
        title: 'Activities',
        items: [
          {
            href: route.transactionHome,
            label: 'Transaction',
            icon: 'ReceiptPercent',
          },
        ],
      },
    ],
    [t],
  )

  return sections
}
