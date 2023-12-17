import { useGetEntriesQuery } from "@/api/graphql";
import { useVaultContext } from "@/hooks";
import { EntryTable } from "..";

export const EntryDashboard: React.FC = () => {
  const [{ curVaultId }] = useVaultContext();
  const {
    data,
    loading,
    error,
  } = useGetEntriesQuery({
    variables: {
      input: {
        vaultId: curVaultId ?? '',
      },
    },
    skip: curVaultId == null
  });

  return <EntryTable data={data?.getEntries ?? []} />
}