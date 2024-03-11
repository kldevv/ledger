import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { type ExchangeDetailsQuery } from '@/api/graphql'
import {
  DescriptionList,
  EntryStatusChip,
  CurrencyChip,
} from '@/components/core'
import { useTreasuryBookContext } from '@/hooks'

import type { DescriptionListItem } from '@/components/core'

export type ExchangeTransactionDescriptionListData = Exclude<
  ExchangeDetailsQuery['exchange'],
  null | undefined
>['origin' | 'destination']

export interface ExchangeTransactionDescriptionListProps {
  /**
   * Data
   */
  data?: ExchangeTransactionDescriptionListData
}

export const ExchangeTransactionDescriptionList: React.FC<
  ExchangeTransactionDescriptionListProps
> = ({ data }) => {
  const { t } = useTranslation('exchange')
  const { id, treasuryBookId, status, amount } = data ?? {}
  const { data: { treasuryBooks } = {} } = useTreasuryBookContext()

  const items: DescriptionListItem[] = useMemo(() => {
    const treasuryBook = treasuryBooks?.find(({ id }) => id === treasuryBookId)

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
  }, [amount, id, status, t, treasuryBookId, treasuryBooks])

  return <DescriptionList items={items} />
}
