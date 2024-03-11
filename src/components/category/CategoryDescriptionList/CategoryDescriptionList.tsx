import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { DescriptionList, FormattedDate } from '@/components/core'

import type { CategoryQuery } from '@/api/graphql'
import type { DescriptionListItem } from '@/components/core'

export type CategoryDescriptionListData = CategoryQuery['category']

export interface CategoryDescriptionListProps {
  /**
   * Data
   */
  data?: CategoryDescriptionListData
}

export const CategoryDescriptionList: React.FC<
  CategoryDescriptionListProps
> = ({ data }) => {
  const { t } = useTranslation('category')
  const { id, name, type, createdAt, updatedAt } = data ?? {}

  const items: DescriptionListItem[] = useMemo(
    () => [
      {
        title: t('CategoryDescriptionList.title.id'),
        description: id,
      },
      {
        title: t('CategoryDescriptionList.title.name'),
        description: name,
      },
      {
        title: t('CategoryDescriptionList.title.type'),
        description: type,
      },
      {
        title: t('CategoryDescriptionList.title.createdAt'),
        description: <FormattedDate dateTime={createdAt} />,
      },
      {
        title: t('CategoryDescriptionList.title.updatedAt'),
        description: <FormattedDate dateTime={updatedAt} />,
      },
    ],
    [createdAt, id, name, t, type, updatedAt],
  )

  return <DescriptionList items={items} />
}
