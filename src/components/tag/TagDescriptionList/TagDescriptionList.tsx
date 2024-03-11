import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { DescriptionList, FormattedDate, TagTypeChip } from '@/components/core'

import type { TagDetailsQuery } from '@/api/graphql'
import type { DescriptionListItem } from '@/components/core'

export type TagDescriptionListData = TagDetailsQuery['tag']

export interface TagDescriptionListProps {
  /**
   * Data
   */
  data?: TagDescriptionListData
}

export const TagDescriptionList: React.FC<TagDescriptionListProps> = ({
  data,
}) => {
  const { t } = useTranslation('tag')
  const { id, name, createdAt, updatedAt, type } = data ?? {}

  const items: DescriptionListItem[] = useMemo(
    () => [
      {
        title: t('TagDescriptionList.title.id'),
        description: id,
      },
      {
        title: t('TagDescriptionList.title.name'),
        description: name,
      },
      {
        title: t('TagDescriptionList.title.name'),
        description: <TagTypeChip type={type} />,
      },
      {
        title: t('TagDescriptionList.title.createdAt'),
        description: <FormattedDate dateTime={createdAt} />,
      },
      {
        title: t('TagDescriptionList.title.updatedAt'),
        description: <FormattedDate dateTime={updatedAt} />,
      },
    ],
    [t, id, name, type, createdAt, updatedAt],
  )

  return <DescriptionList items={items} />
}
