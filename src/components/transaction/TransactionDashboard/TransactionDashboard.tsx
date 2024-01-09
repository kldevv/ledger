import { useGetTransactionsQuery } from '@/api/graphql'
import { useVaultContext } from '@/hooks'

import { TransactionTable } from '..'

export const TransactionDashboard: React.FC = () => {
  const [{ curVaultId }] = useVaultContext()

  const { data } = useGetTransactionsQuery({
    variables: {
      input: {
        vaultId: curVaultId ?? '',
      },
    },
    skip: curVaultId == null,
  })

  return <TransactionTable data={data?.getTransactions ?? []} />
}
