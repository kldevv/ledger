import { useRouter } from 'next/router'
import { useMemo } from 'react'

import { useGetExchangeQuery } from '@/api/graphql'

import { ExchangeDescriptionList } from '..'

export const ExchangeDetails: React.FC = () => {
  const router = useRouter()

  const { id } = router.query
  const exchangeId = useMemo(() => {
    return id == null || Array.isArray(id) ? null : id
  }, [id])

  const { data } = useGetExchangeQuery({
    variables: {
      input: {
        id: exchangeId ?? '',
      },
    },
    skip: exchangeId == null,
  })

  return (
    data?.getExchange && (
      <div>
        <ExchangeDescriptionList data={data.getExchange} />
      </div>
    )
  )
}
