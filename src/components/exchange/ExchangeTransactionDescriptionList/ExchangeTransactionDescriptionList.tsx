import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { type ExchangeDetailsQuery } from '@/api/graphql'
import {
  DescriptionList,
  EntryStatusChip,
  CurrencyChip,
} from '@/components/common'
import { useTreasuryBookContext } from '@/hooks'

import type { DescriptionListItem } from '@/components/common'

export type ExchangeTransactionDescriptionListData = Exclude<
  ExchangeDetailsQuery['exchange'],
  null | undefined
>['origin' | 'destination']

export interface ExchangeTransactionDescriptionListProps {
  /**
   * Data
   */
  data: ExchangeTransactionDescriptionListData
}

export const ExchangeTransactionDescriptionList: React.FC<
  ExchangeTransactionDescriptionListProps
> = ({ data: { id, treasuryBookId, status, amount } }) => {
  const { t } = useTranslation('exchange')
  const { data } = useTreasuryBookContext()

  const items: DescriptionListItem[] = useMemo(() => {
    const treasuryBook = data?.treasuryBooks.find(
      ({ id }) => id === treasuryBookId,
    )

    return [
      {
        title: t('ExchangeTransactionDescriptionList.title.treasuryBook'),
        description: treasuryBook?.name,
      },
      {
        title: t('ExchangeTransactionDescriptionList.title.currency'),
        description: <CurrencyChip currency={treasuryBook?.currency} />,
      },
      {
        title: t('ExchangeTransactionDescriptionList.title.id'),
        description: id,
      },
      {
        title: t('ExchangeTransactionDescriptionList.title.status'),
        description: <EntryStatusChip status={status} />,
      },
      {
        title: t('ExchangeTransactionDescriptionList.title.amount'),
        description: amount,
      },
    ]
  }, [amount, data?.treasuryBooks, id, status, t, treasuryBookId])

  return <DescriptionList items={items} />
}
