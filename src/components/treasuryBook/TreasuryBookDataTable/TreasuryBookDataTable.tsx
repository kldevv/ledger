import { Card } from '@/components/core'

import { TreasuryBookTable } from '..'
import { useTreasuryBooksQuery } from '@/api/graphql'

export const TreasuryBookDataTable: React.FC = () => {
  const { data } = useTreasuryBooksQuery({
    variables: {
      input: {
        ownerId: '81087108-3748-446a-b033-a85d7c9ace7b',
      },
    },
  })

  return (
    <Card>
      <TreasuryBookTable data={data?.treasuryBooks ?? []} />
    </Card>
  )
}
