import { useRouter } from 'next/router'
import { useMemo } from 'react'

import { useExchangeDetailsQuery } from '@/api/graphql'

import { ExchangeDescriptionList } from '..'

export const ExchangeDetails: React.FC = () => {
  const router = useRouter()

  const { id } = router.query
  const exchangeId = useMemo(() => {
    return id == null || Array.isArray(id) ? null : id
  }, [id])

  const { data } = useExchangeDetailsQuery({
    variables: {
      exchangeInput: {
        id: exchangeId ?? '',
      },
      transactionsInput: {
        exchangeId: exchangeId,
      },
    },
    skip: exchangeId == null,
  })

  return (
    data?.exchange && (
      <div>
        <ExchangeDescriptionList data={data.exchange} />
      </div>
    )
  )
}
