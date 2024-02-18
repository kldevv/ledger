import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { DescriptionList, FormattedDate } from '@/components/common'

import type { GetCategoryQuery } from '@/api/graphql'
import type { DescriptionListItemProps } from '@/components/common'

export type CategoryDescriptionListData = Exclude<
  GetCategoryQuery['category'],
  null | undefined
>

export interface CategoryDescriptionListProps {
  /**
   * Data
   */
  data: CategoryDescriptionListData
}

export const CategoryDescriptionList: React.FC<
  CategoryDescriptionListProps
> = ({ data: { id, name, type, createdAt, updatedAt } }) => {
  const { t } = useTranslation('category')

  const items: DescriptionListItemProps[] = useMemo(
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
