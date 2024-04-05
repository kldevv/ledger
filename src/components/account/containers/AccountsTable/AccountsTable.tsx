import { useAccountsQuery } from '@/api/graphql'
import { useCurrentBranch } from '@/components/core/hooks'
import { Card, Table } from '@/components/core/presentationals'

import { useAccountsTableCol } from '../../hooks'

export const AccountsTable: React.FC = () => {
  const colDefs = useAccountsTableCol()
  const [currentBranch] = useCurrentBranch()
  const { data, loading } = useAccountsQuery({
    variables: {
      input: {
        branchId: currentBranch?.id ?? '',
      },
    },
    skip: currentBranch === null,
  })

  return (
    <Card>
      <Table colDefs={colDefs} data={data?.accounts ?? []} loading={loading} />
    </Card>
  )
}
