import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { DescriptionList, FormattedDate } from '@/components/common'

import type { GetTagDetailQuery } from '@/api/graphql'
import type { DescriptionListItem } from '@/components/common'

export type TagDescriptionListData = Exclude<
  GetTagDetailQuery['tag'],
  null | undefined
>

export interface TagDescriptionListProps {
  /**
   * Data
   */
  data: TagDescriptionListData
}

export const TagDescriptionList: React.FC<TagDescriptionListProps> = ({
  data: { id, name, createdAt, updatedAt },
}) => {
  const { t } = useTranslation('tag')

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
        title: t('TagDescriptionList.title.createdAt'),
        description: <FormattedDate dateTime={createdAt} />,
      },
      {
        title: t('TagDescriptionList.title.updatedAt'),
        description: <FormattedDate dateTime={updatedAt} />,
      },
    ],
    [t, id, name, createdAt, updatedAt],
  )

  return <DescriptionList items={items} />
}
