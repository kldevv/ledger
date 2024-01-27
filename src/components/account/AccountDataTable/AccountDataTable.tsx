import { useGetAccountsQuery } from '@/api/graphql'
import { Card } from '@/components/common'
import { useTreasuryBookContext } from '@/hooks'

import { AccountTable } from '..'

export const AccountDataTable: React.FC = () => {
  const { selectedTreasuryBookId } = useTreasuryBookContext()
  const { data } = useGetAccountsQuery({
    variables: {
      input: {
        treasuryBookId: selectedTreasuryBookId ?? '',
      },
    },
    fetchPolicy: 'cache-and-network',
    skip: selectedTreasuryBookId == null,
  })

  return (
    <Card>
      <AccountTable data={data?.getAccounts ?? []} />
    </Card>
  )
}
