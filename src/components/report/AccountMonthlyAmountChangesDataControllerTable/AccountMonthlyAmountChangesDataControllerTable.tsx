import { useState } from 'react'

import { useGetAccountMonthlyAmountChangesQuery, DateType } from '@/api/graphql'
import {
  Card,
  EntryStatusFilterDropdown,
  RadioGroupFilter,
  YearFilterDropdown,
} from '@/components/common'
import { useTreasuryBookContext } from '@/hooks'

import { MonthlyAmountChangesTable } from '..'

import type { EntryStatus } from '@/api/graphql'

export const AccountMonthlyAmountChangesDataControllerTable: React.FC = () => {
  const { selectedTreasuryBookId } = useTreasuryBookContext()
  const [statusFilter, setStatusFilter] = useState<EntryStatus | null>(null)
  const [yearFilter, setYearFilter] = useState<number | null>(null)
  const [dateTypeFilter, setDateTypeFilter] = useState<DateType>(
    DateType.ACCRUAL,
  )

  const { data } = useGetAccountMonthlyAmountChangesQuery({
    variables: {
      input: {
        vaultId: selectedTreasuryBookId ?? '',
        year: yearFilter,
        type: dateTypeFilter,
      },
    },
    skip: selectedTreasuryBookId == null,
  })

  return (
    <>
      <RadioGroupFilter
        value={dateTypeFilter}
        onChange={setDateTypeFilter}
        options={[
          { label: DateType.ACCRUAL, value: DateType.ACCRUAL },
          { label: DateType.TRANSACTION, value: DateType.TRANSACTION },
        ]}
      />
      <Card>
        <div className="flex flex-col space-y-3">
          <div className="flex items-center border-b pt-1 pb-3 border-b-mid-gray space-x-2">
            <EntryStatusFilterDropdown
              value={statusFilter}
              onChange={setStatusFilter}
            />
            <YearFilterDropdown
              value={yearFilter}
              onChange={setYearFilter}
              type={dateTypeFilter}
            />
          </div>
          <MonthlyAmountChangesTable
            data={data?.getAccountMonthlyAmountChanges ?? []}
          />
        </div>
      </Card>
    </>
  )
}
