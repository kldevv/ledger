import { useTagsQuery } from '@/api/graphql'
import { Table } from '@/components/core'
import { useCurrentBranch } from '@/components/core/hooks'

import { useTagsTableCol } from '../../hooks'

export const TagsTable: React.FC = () => {
  const [currentBranch] = useCurrentBranch()
  const { data } = useTagsQuery({
    variables: {
      input: {
        branchId: currentBranch?.id ?? '',
      },
    },
    skip: currentBranch == null,
  })
  const colDefs = useTagsTableCol()

  return <Table data={data?.tags ?? []} colDefs={colDefs} />
}
