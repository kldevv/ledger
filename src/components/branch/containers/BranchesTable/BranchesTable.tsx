import { useBranchesQuery } from '@/api/graphql'
import { Card, Table } from '@/components/core'

import { useBranchesTableCol } from '../../hooks'

export const BranchesTable: React.FC = () => {
  const colDefs = useBranchesTableCol()
  const { data } = useBranchesQuery({
    variables: {
      input: {
        userId: '81087108-3748-446a-b033-a85d7c9ace7b',
      },
    },
  })

  return (
    <Card>
      <Table data={data?.branches ?? []} colDefs={colDefs} />
    </Card>
  )
}