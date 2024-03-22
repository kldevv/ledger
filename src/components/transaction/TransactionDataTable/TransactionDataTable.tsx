import { useTransactionsQuery } from '@/api/graphql'
import { useCurrentBranch } from '@/components/core/hooks'

import { TransactionFilteredTable } from '..'

export const TransactionDataTable: React.FC = () => {
  const [currentBranch] = useCurrentBranch()

  const { data, loading } = useTransactionsQuery({
    variables: {
      input: {
        treasuryBookId: currentBranch?.id,
      },
    },
    skip: !currentBranch?.id,
  })

  return (
    <TransactionFilteredTable data={data?.transactions} loading={loading} />
  )
}
