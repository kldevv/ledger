import { useState } from 'react'

import { useGetAccountMonthlyAmountChangesQuery } from '@/api/graphql'
import { Card, EntryStatusFilterDropdown } from '@/components/common'
import { useTreasuryBookContext } from '@/hooks'

import { MonthlyAmountChangesTable } from '..'

import type { EntryStatus } from '@/api/graphql'

export const MonthlyAmountChangesAccountDataControllerTable: React.FC = () => {
  const { selectedTreasuryBookId } = useTreasuryBookContext()
  const [statusFilter, setStatusFilter] = useState<EntryStatus | null>(null)

  const { data } = useGetAccountMonthlyAmountChangesQuery({
    variables: {
      input: {
        vaultId: selectedTreasuryBookId ?? '',
        year: 2024,
      },
    },
    skip: selectedTreasuryBookId == null,
  })

  return (
    <Card>
      <div className="flex flex-col space-y-3">
        <div className="flex items-center border-b pt-1 pb-3 border-b-mid-gray">
          <EntryStatusFilterDropdown
            value={statusFilter}
            onChange={setStatusFilter}
          />
        </div>
        <MonthlyAmountChangesTable
          data={data?.getAccountMonthlyAmountChanges ?? []}
        />
      </div>
    </Card>
  )
}
