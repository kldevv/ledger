import { useGetExchangesQuery } from '@/api/graphql'
import { Card } from '@/components/common'
import { useTreasuryBookContext } from '@/hooks'

import { ExchangeTable } from '..'

export const ExchangeDataTable: React.FC = () => {
  const { ownerId } = useTreasuryBookContext()
  const { data } = useGetExchangesQuery({
    variables: {
      input: {
        ownerId,
      },
    },
    fetchPolicy: 'cache-and-network',
  })

  return (
    <Card>
      <ExchangeTable data={data?.getExchanges ?? []} />
    </Card>
  )
}
