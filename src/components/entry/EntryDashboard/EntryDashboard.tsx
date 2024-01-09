import { useGetEntriesQuery } from '@/api/graphql'
import { EntryTable } from '@/components/entry'
import { useVaultContext } from '@/hooks'

export const EntryDashboard: React.FC = () => {
  const [{ curVaultId }] = useVaultContext()
  const { data } = useGetEntriesQuery({
    variables: {
      input: {
        vaultId: curVaultId ?? '',
      },
    },
    skip: curVaultId == null,
  })

  return <EntryTable data={data?.getEntries ?? []} />
}
