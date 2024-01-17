import { useGetTransactionsQuery } from '@/api/graphql'
import { useTreasuryBookContext } from '@/hooks'

import { TransactionFilteredTable } from '..'

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

  return <TransactionFilteredTable data={data?.getTransactions ?? []} />
}
