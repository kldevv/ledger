import { useGetEntriesQuery } from '@/api/graphql'
import { EntryTable } from '@/components/entry'
import { useTreasuryBookContext } from '@/hooks'

export const EntryDashboard: React.FC = () => {
  const { selectedTreasuryBookId } = useTreasuryBookContext()
  const { data } = useGetEntriesQuery({
    variables: {
      input: {
        vaultId: selectedTreasuryBookId ?? '',
      },
    },
    skip: selectedTreasuryBookId == null,
  })

  return <EntryTable data={data?.getEntries ?? []} />
}
