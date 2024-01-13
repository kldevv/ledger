import { useGetTransactionsQuery } from '@/api/graphql'
import { TransactionTable } from '@/components/transaction'
import { useTreasuryBookContext } from '@/hooks'

export const TransactionDashboard: React.FC = () => {
  const { selectedTreasuryBookId } = useTreasuryBookContext()

  const { data } = useGetTransactionsQuery({
    variables: {
      input: {
        vaultId: selectedTreasuryBookId ?? '',
      },
    },
    skip: selectedTreasuryBookId == null,
  })

  return <TransactionTable data={data?.getTransactions ?? []} />
}
