import { useGetAccountsQuery } from '@/api/graphql'
import { Card } from '@/components/common'
import { useTreasuryBookContext } from '@/hooks'

import { AccountTable } from '..'

export const AccountDashboard: React.FC = () => {
  const { selectedTreasuryBookId } = useTreasuryBookContext()
  const { data } = useGetAccountsQuery({
    variables: {
      input: {
        vaultId: selectedTreasuryBookId ?? '',
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
