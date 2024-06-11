import { useBranchesQuery } from '@/api/graphql'
import { Card, Table } from '@/components/core/presentationals'

import { useBranchesTableCol } from '../../hooks'

export const BranchesTable: React.FC = () => {
  const colDefs = useBranchesTableCol()
  const { data, loading } = useBranchesQuery({
    variables: {
      input: {
        active: true,
      },
    },
  })

  return (
    <Card>
      <Table data={data?.branches ?? []} colDefs={colDefs} loading={loading} />
    </Card>
  )
}
