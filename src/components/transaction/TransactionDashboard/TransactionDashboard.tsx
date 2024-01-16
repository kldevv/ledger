import { EntryStatus } from '@prisma/client'
import { useCallback, useMemo, useState } from 'react'

import { useGetTransactionsQuery } from '@/api/graphql'
import { Card, DropdownFilter, StatusChip } from '@/components/common'
import { TransactionTable } from '@/components/transaction'
import { useTreasuryBookContext } from '@/hooks'

export const TransactionDashboard: React.FC = () => {
  const { selectedTreasuryBookId } = useTreasuryBookContext()

  const statusFilterOptions = useMemo(() => {
    const options = Object.values(EntryStatus).map((status) => ({
      value: status,
      label: <StatusChip status={status} />,
    }))

    return [
      {
        value: null,
        label: 'All Status',
      },
      ...options,
    ]
  }, [])

  const [statusFilter, setStatusFilter] = useState<EntryStatus | null>(null)

  const handleSetStatusFilter = useCallback(
    (value: EntryStatus | null) => setStatusFilter(value),
    [],
  )

  const { data } = useGetTransactionsQuery({
    variables: {
      input: {
        vaultId: selectedTreasuryBookId ?? '',
      },
    },
    skip: selectedTreasuryBookId == null,
  })

  const tableData = useMemo(() => {
    const transactions = data?.getTransactions ?? []

    if (statusFilter === null) {
      return transactions
    }
    return transactions.filter(({ status }) => status === statusFilter)
  }, [data?.getTransactions, statusFilter])

  return (
    <Card>
      <div className="flex flex-col space-y-3">
        <div className="flex items-center mt-3 border-b pb-6 border-b-mid-gray">
          <DropdownFilter
            value={statusFilter}
            onChange={handleSetStatusFilter}
            options={statusFilterOptions}
          />
        </div>
        <TransactionTable data={tableData} />
      </div>
    </Card>
  )
}
