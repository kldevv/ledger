import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import {
  DescriptionList,
  FormattedDate,
  StatusChip,
  Tag,
} from '@/components/common'

import type { EntryStatus, GetTransactionDetailQuery } from '@/api/graphql'
import type { DescriptionListItemProps } from '@/components/common'

type TransactionDescriptionListData = Exclude<
  GetTransactionDetailQuery['getTransaction'],
  null
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

  const items: DescriptionListItemProps[] = useMemo(
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
        description: <StatusChip status={status} />,
      },
      {
        title: t('TransactionDescriptionList.title.tags'),
        description: (
          <div className="flex gap-1 max-w-full flex-wrap">
            {tags?.map((tag) => <Tag key={tag.id} {...tag} />)}
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
