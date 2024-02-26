import { useAccountsQuery } from '@/api/graphql'
import { Card } from '@/components/common'
import { useTreasuryBookContext } from '@/hooks'

import { AccountTable } from '..'

export const AccountDataTable: React.FC = () => {
  const { selectedTreasuryBookId } = useTreasuryBookContext()
  const { data } = useAccountsQuery({
    variables: {
      input: {
        treasuryBookId: selectedTreasuryBookId ?? '',
      },
    },
    fetchPolicy: 'cache-and-network',
    skip: selectedTreasuryBookId == null,
  })

  return (
    <Card className="w-full">
      <AccountTable data={data?.accounts ?? []} />
    </Card>
  )
}
