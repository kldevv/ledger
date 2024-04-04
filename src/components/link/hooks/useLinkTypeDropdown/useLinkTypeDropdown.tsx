import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { LinkType } from '@/api/graphql'

export const useLinkTypeDropdown = () => {
  const { t } = useTranslation('link')

  return useMemo(
    () => ({
      items: Object.values(LinkType).map((type) => ({
        value: type,
        title: t(`linkType.${type}`),
      })),
    }),
    [t],
  )
}
