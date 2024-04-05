import { useEntriesQuery } from '@/api/graphql'
import { useCurrentBranch } from '@/components/core/hooks'
import { Card, Table } from '@/components/core/presentationals'

import { useEntriesTableCol } from '../../hooks'

export const EntriesTable: React.FC = () => {
  const colDefs = useEntriesTableCol()
  const [currentBranch] = useCurrentBranch()
  const { data, loading } = useEntriesQuery({
    variables: {
      input: {
        branchId: currentBranch?.id ?? '',
      },
    },
    skip: currentBranch === null,
  })

  return (
    <Card>
      <Table colDefs={colDefs} data={data?.entries ?? []} loading={loading} />
    </Card>
  )
}
