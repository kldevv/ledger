import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { EntryStatus } from '@/api/graphql'

export const useEntryStatusDropdown = () => {
  const { t } = useTranslation('common')

  return useMemo(
    () => ({
      items:
        [EntryStatus.COMPLETED, EntryStatus.PENDING]?.map((status) => ({
          value: status,
          title: t(`entryStatus.${status}`),
          status,
        })) ?? [],
    }),
    [t],
  )
}
