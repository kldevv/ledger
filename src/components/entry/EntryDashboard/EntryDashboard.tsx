import { useGetEntriesQuery } from '@/api/graphql'
import { Card } from '@/components/common'
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

  return (
    <Card>
      <EntryTable data={data?.getEntries ?? []} />
    </Card>
  )
}
