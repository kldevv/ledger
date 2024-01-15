import { useGetTransactionsQuery } from '@/api/graphql'
import { Card, Pagination } from '@/components/common'
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
        <div className="border-t border-t-mid-gray w-full flex items-center justify-center pt-5">
          <Pagination pageCount={10} />
        </div>
      </div>
    </Card>
  )
}
