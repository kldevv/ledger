import { useExchangesQuery } from '@/api/graphql'
import { Card } from '@/components/core'
import { useTreasuryBookContext } from '@/hooks'

import { ExchangeTable } from '..'

export const ExchangeDataTable: React.FC = () => {
  const { ownerId } = useTreasuryBookContext()
  const { data } = useExchangesQuery({
    variables: {
      input: {
        ownerId,
      },
    },
    fetchPolicy: 'cache-and-network',
  })

  return (
    <Card>
      <ExchangeTable data={data?.exchanges ?? []} />
    </Card>
  )
}
