import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import {
  DescriptionList,
  FormattedDate,
  EntryStatusChip,
  TagChip,
} from '@/components/common'

import type { EntryStatus, TransactionDetailsQuery } from '@/api/graphql'
import type { DescriptionListItem } from '@/components/common'

type TransactionDescriptionListData = Partial<
  Exclude<TransactionDetailsQuery['transaction'], null>
> & {
  /**
   * Summary of the entries status
   */
  status: EntryStatus
}

export interface TransactionDescriptionListProps {
  /**
   * Transaction detail
   */
  data: TransactionDescriptionListData
}

export const TransactionDescriptionList: React.FC<
  TransactionDescriptionListProps
> = ({
  data: { id, accrualDate, note, status, createdAt, updatedAt, tags } = {},
}) => {
  const { t } = useTranslation('transaction')

  const items: DescriptionListItem[] = useMemo(
    () => [
      {
        title: t('TransactionDescriptionList.title.id'),
        description: id,
      },
      {
        title: t('TransactionDescriptionList.title.accrualDate'),
        description: <FormattedDate dateTime={accrualDate} />,
      },
      {
        title: t('TransactionDescriptionList.title.note'),
        description: note,
      },
      {
        title: t('TransactionDescriptionList.title.status'),
        description: <EntryStatusChip status={status} />,
      },
      {
        title: t('TransactionDescriptionList.title.tags'),
        description: (
          <div className="flex max-w-full flex-wrap gap-1">
            {tags?.map((tag) => <TagChip key={tag.id} tag={tag} />)}
          </div>
        ),
      },
      {
        title: t('TransactionDescriptionList.title.createdAt'),
        description: <FormattedDate dateTime={createdAt} />,
      },
      {
        title: t('TransactionDescriptionList.title.updatedAt'),
        description: <FormattedDate dateTime={updatedAt} />,
      },
    ],
    [accrualDate, createdAt, id, note, status, t, tags, updatedAt],
  )

  return <DescriptionList items={items} />
}
