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
  data: { id, accrualDate, note, status, createdDate, updatedDate, tags } = {},
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
        title: t('TransactionDescriptionList.title.createdDate'),
        description: <FormattedDate dateTime={createdDate} />,
      },
      {
        title: t('TransactionDescriptionList.title.updatedDate'),
        description: <FormattedDate dateTime={updatedDate} />,
      },
    ],
    [accrualDate, createdDate, id, note, status, t, tags, updatedDate],
  )

  return <DescriptionList items={items} />
}
