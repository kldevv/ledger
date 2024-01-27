import { useGetEntriesQuery } from '@/api/graphql'
import { EntryFilteredTable } from '@/components/entry'
import { useTreasuryBookContext } from '@/hooks'

export const EntryDashboard: React.FC = () => {
  const { selectedTreasuryBookId } = useTreasuryBookContext()
  const { data } = useGetEntriesQuery({
    variables: {
      input: {
        treasuryBookId: selectedTreasuryBookId ?? '',
      },
    },
    skip: selectedTreasuryBookId == null,
  })

  return <EntryFilteredTable data={data?.getEntries ?? []} />
}
