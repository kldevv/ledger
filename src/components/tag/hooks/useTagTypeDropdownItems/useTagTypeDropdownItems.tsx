import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { TagType } from '@/api/graphql'
import { tagTypeToSolidIconName } from '@/shared/utils'

export const useTagTypeDropdownItems = () => {
  const { t } = useTranslation('tag')

  return useMemo(
    () =>
      Object.values(TagType).map((type) => ({
        value: type,
        title: t(`tagType.${type}`),
        solidIcon: tagTypeToSolidIconName(type),
      })),
    [t],
  )
}
