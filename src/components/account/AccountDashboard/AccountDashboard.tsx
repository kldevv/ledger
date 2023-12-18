import { useGetAccountsQuery } from "@/api/graphql";
import { AccountTable } from ".."
import { useVaultContext } from "@/hooks";

export const AccountDashboard: React.FC = () => {
    const [{ curVaultId }] = useVaultContext();
    const { data, loading, error } = useGetAccountsQuery({
      variables: {
        input: {
          vaultId: curVaultId ?? '',
        },
      },
      fetchPolicy: 'cache-and-network',
      skip: curVaultId == null,
    });

  return <AccountTable data={data?.getAccounts ?? []} />
}