import { useAccountGroupsQuery } from '@/api/graphql'
import { Card, Table } from '@/components/core'
import { useCurrentBranch } from '@/components/core/hooks'

import { useAccountGroupsTableCol } from '../../hooks'

export const AccountGroupsTable: React.FC = () => {
  const colDefs = useAccountGroupsTableCol()
  const [currentBranch] = useCurrentBranch()
  const { data } = useAccountGroupsQuery({
    variables: {
      input: {
        branchId: currentBranch?.id ?? '',
      },
    },
    skip: currentBranch?.id == null,
  })

  return (
    <Card>
      <Table data={data?.accountGroups ?? []} colDefs={colDefs} />
    </Card>
  )
}
