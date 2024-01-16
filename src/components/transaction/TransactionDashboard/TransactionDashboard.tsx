import { useGetTransactionsQuery } from '@/api/graphql'
import { Card } from '@/components/common'
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

  return (
    <Card>
      <div className="flex flex-col space-y-3">
        <div className="flex items-center mt-3 border-b border-b-mid-gray">
          <div className="w-6 h-3 border-2 border-mid-gray rounded ml-auto"></div>
        </div>
        <TransactionTable data={data?.getTransactions ?? []} />
      </div>
    </Card>
  )
}
