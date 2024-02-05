import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { DescriptionList, FormattedDate } from '@/components/common'

import type { ExchangeQuery } from '@/api/graphql'
import type { DescriptionListItemProps } from '@/components/common'

export type ExchangeDescriptionListData = Exclude<
  ExchangeQuery['exchange'],
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

  const items: DescriptionListItemProps[] = useMemo(
    () => [
      {
        title: t('ExchangeDescriptionList.title.id'),
        description: id,
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
        title: t('ExchangeDescriptionList.title.createdAt'),
        description: <FormattedDate dateTime={createdAt} />,
      },
      {
        title: t('ExchangeDescriptionList.title.updatedAt'),
        description: <FormattedDate dateTime={updatedAt} />,
      },
    ],
    [createdAt, destination.id, id, origin.id, t, updatedAt],
  )

  return <DescriptionList items={items} />
}
