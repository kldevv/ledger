import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { DescriptionList, FormattedDate, CurrencyChip } from '@/components/core'

import type { TreasuryBooksQuery } from '@/api/graphql'
import type { DescriptionListItem } from '@/components/core'

type TreasuryBookDescriptionListData = Exclude<
  TreasuryBooksQuery['treasuryBooks'][number],
  null
>

export interface TreasuryBookDescriptionListProps {
  /**
   * Treasury book detail
   */
  data?: TreasuryBookDescriptionListData
  /**
   * Loading?
   */
  loading?: boolean
}

export const TreasuryBookDescriptionList: React.FC<
  TreasuryBookDescriptionListProps
> = ({ data: { id, name, currency, createdAt, updatedAt } = {}, loading }) => {
  const { t } = useTranslation('treasuryBook')

  const items: DescriptionListItem[] = useMemo(
    () => [
      {
        title: t('TreasuryBookDescriptionList.title.id'),
        description: id,
      },
      {
        title: t('TreasuryBookDescriptionList.title.name'),
        description: name,
      },
      {
        title: t('TreasuryBookDescriptionList.title.currency'),
        description: <CurrencyChip currency={currency} />,
      },
      {
        title: t('TreasuryBookDescriptionList.title.createdAt'),
        description: <FormattedDate dateTime={createdAt} />,
      },
      {
        title: t('TreasuryBookDescriptionList.title.updatedAt'),
        description: <FormattedDate dateTime={updatedAt} />,
      },
    ],
    [t, id, name, currency, createdAt, updatedAt],
  )

  return <DescriptionList items={items} loading={loading} />
}
