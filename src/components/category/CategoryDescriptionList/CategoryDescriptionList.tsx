import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { DescriptionList, FormattedDate } from '@/components/common'

import type { GetCategoryQuery } from '@/api/graphql'
import type { DescriptionListItem } from '@/components/common'

export type CategoryDescriptionListData = Exclude<
  GetCategoryQuery['getCategory'],
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
> = ({ data: { id, name, type, createdDate, updatedDate } }) => {
  const { t } = useTranslation('category')

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
        title: t('CategoryDescriptionList.title.createdDate'),
        description: <FormattedDate dateTime={createdDate} />,
      },
      {
        title: t('CategoryDescriptionList.title.updatedDate'),
        description: <FormattedDate dateTime={updatedDate} />,
      },
    ],
    [createdDate, id, name, t, type, updatedDate],
  )

  return <DescriptionList items={items} />
}
