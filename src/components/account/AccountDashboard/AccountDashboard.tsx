import { useGetAccountsQuery } from '@/api/graphql'
import { useVaultContext } from '@/hooks'

import { AccountTable } from '..'

export const AccountDashboard: React.FC = () => {
  const [{ curVaultId }] = useVaultContext()
  const { data } = useGetAccountsQuery({
    variables: {
      input: {
        vaultId: curVaultId ?? '',
      },
    },
    fetchPolicy: 'cache-and-network',
    skip: curVaultId == null,
  })

  return <AccountTable data={data?.getAccounts ?? []} />
}
