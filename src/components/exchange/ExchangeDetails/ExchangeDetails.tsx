import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { useExchangeDetailsQuery } from '@/api/graphql'
import { EntryFilteredTable } from '@/components/entry'

import { ExchangeDescriptionList } from '..'

export const ExchangeDetails: React.FC = () => {
  const {
    query: { id },
  } = useRouter()
  const { t } = useTranslation('exchange')

  const exchangeId = useMemo(() => {
    return id == null || Array.isArray(id) ? null : id
  }, [id])

  const { data } = useExchangeDetailsQuery({
    variables: {
      exchangeInput: {
        id: exchangeId ?? '',
      },
      entriesInput: {
        exchangeId: exchangeId,
      },
    },
    skip: exchangeId == null,
  })

  if (data?.exchange == null) {
    return null
  }

  return (
    <div>
      <ExchangeDescriptionList data={data.exchange} />
      <div className="mt-12 flex flex-col space-y-3">
        <h3 className="text-dark-shades font-semibold">{t`TransactionDetails.title.entries`}</h3>
        <EntryFilteredTable data={data.entries ?? []} />
      </div>
    </div>
  )
}
