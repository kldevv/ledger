import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { EntryStatus, type ExchangeDetailsQuery } from '@/api/graphql'
import {
  DescriptionList,
  FormattedDate,
  EntryStatusChip,
} from '@/components/common'

import type { DescriptionListItem } from '@/components/common'

export type ExchangeDescriptionListData = Exclude<
  ExchangeDetailsQuery['exchange'],
  null | undefined
>

export interface ExchangeDescriptionListProps {
  /**
   * Data
   */
  data: ExchangeDescriptionListData
}

export const ExchangeDescriptionList: React.FC<
  ExchangeDescriptionListProps
> = ({ data: { id, origin, destination, createdAt, updatedAt } }) => {
  const { t } = useTranslation('exchange')

  const items: DescriptionListItem[] = useMemo(() => {
    const status =
      origin.status === EntryStatus.COMPLETED &&
      destination.status === EntryStatus.COMPLETED
        ? EntryStatus.COMPLETED
        : EntryStatus.PENDING

    return [
      {
        title: t('ExchangeDescriptionList.title.id'),
        description: id,
      },
      {
        title: t('ExchangeDescriptionList.title.date'),
        description: <FormattedDate dateTime={origin.accrualDate} />,
      },
      {
        title: t('ExchangeDescriptionList.title.note'),
        description: origin.note,
      },
      {
        title: t('ExchangeDescriptionList.title.origin'),
        description: origin.id,
      },
      {
        title: t('ExchangeDescriptionList.title.destination'),
        description: destination.id,
      },
      {
        title: t('ExchangeDescriptionList.title.status'),
        description: <EntryStatusChip status={status} />,
      },
      {
        title: t('ExchangeDescriptionList.title.createdAt'),
        description: <FormattedDate dateTime={createdAt} />,
      },
      {
        title: t('ExchangeDescriptionList.title.updatedAt'),
        description: <FormattedDate dateTime={updatedAt} />,
      },
    ]
  }, [
    createdAt,
    destination.id,
    destination.status,
    id,
    origin.accrualDate,
    origin.id,
    origin.note,
    origin.status,
    t,
    updatedAt,
  ])

  return <DescriptionList items={items} />
}
