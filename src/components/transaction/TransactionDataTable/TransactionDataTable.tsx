import { useTransactionsQuery } from '@/api/graphql'
import { useTreasuryBookContext } from '@/hooks'

import { TransactionFilteredTable } from '..'

export const TransactionDataTable: React.FC = () => {
  const { selectedTreasuryBookId } = useTreasuryBookContext()

  const { data } = useTransactionsQuery({
    variables: {
      input: {
        treasuryBookId: selectedTreasuryBookId,
      },
    },
    skip: selectedTreasuryBookId == null,
  })

  return <TransactionFilteredTable data={data?.transactions ?? []} />
}
