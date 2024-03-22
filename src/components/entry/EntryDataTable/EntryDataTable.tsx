import { useEntriesQuery } from '@/api/graphql'
import { EntryFilteredTable } from '@/components/entry'
import { useCurrentBranch } from '@/components/core/hooks'

export const EntryDataTable: React.FC = () => {
  const [currentBranch] = useCurrentBranch()
  const { data } = useEntriesQuery({
    variables: {
      input: {
        treasuryBookId: currentBranch?.id ?? '',
      },
    },
    skip: !currentBranch?.id,
  })

  return <EntryFilteredTable data={data?.entries ?? []} />
}
