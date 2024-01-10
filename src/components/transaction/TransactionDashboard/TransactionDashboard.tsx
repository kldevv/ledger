import { useGetTransactionsQuery } from '@/api/graphql'
import { TransactionTable } from '@/components/transaction'
import { useVaultContext } from '@/hooks'

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
