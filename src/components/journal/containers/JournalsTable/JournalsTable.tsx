import { useJournalsQuery } from '@/api/graphql'
import { useCurrentBranch } from '@/components/core/hooks'
import { Card, Table } from '@/components/core/presentationals'
import { useJournalsTableCol } from '@/components/journal/hooks'

export const JournalsTable: React.FC = () => {
  const [currentBranch] = useCurrentBranch()
  const colDefs = useJournalsTableCol()
  const { data } = useJournalsQuery({
    variables: {
      input: {
        branchId: currentBranch?.id ?? '',
      },
    },
    skip: currentBranch == null,
    fetchPolicy: 'cache-and-network',
  })

  return (
    <Card>
      <Table colDefs={colDefs} data={data?.journals ?? []} />
    </Card>
  )
}
