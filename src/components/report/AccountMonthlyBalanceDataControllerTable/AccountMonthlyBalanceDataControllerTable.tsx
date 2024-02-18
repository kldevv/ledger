import { useCallback, useState } from 'react'

import { DateType, useGetAccountMonthlyBalanceQuery } from '@/api/graphql'
import {
  Card,
  DateTypeRadioGroupFilter,
  EntryStatusDropdownFilter,
  YearDropdownFilter,
} from '@/components/common'
import { useTreasuryBookContext } from '@/hooks'

import { MonthlyBalanceTable } from '..'

import type { EntryStatus } from '@/api/graphql'

const currentYear = new Date().getFullYear()

export const AccountMonthlyBalanceDataControllerTable: React.FC = () => {
  const { selectedTreasuryBookId } = useTreasuryBookContext()
  const [statusFilter, setStatusFilter] = useState<EntryStatus | null>(null)
  const [yearFilter, setYearFilter] = useState<number>(currentYear)
  const [dateTypeFilter, setDateTypeFilter] = useState<DateType>(
    DateType.ACCRUAL,
  )

  const handleOnDateTypeFilterChange = useCallback((value: DateType) => {
    setYearFilter(currentYear)
    setDateTypeFilter(value)
  }, [])

  const { data, loading } = useGetAccountMonthlyBalanceQuery({
    variables: {
      input: {
        treasuryBookId: selectedTreasuryBookId ?? '',
        year: yearFilter,
        type: dateTypeFilter,
        status: statusFilter,
      },
    },
    fetchPolicy: 'cache-and-network',
    skip: selectedTreasuryBookId == null,
  })

  return (
    <div className="flex flex-col space-y-2">
      <div>
        <DateTypeRadioGroupFilter
          value={dateTypeFilter}
          onChange={handleOnDateTypeFilterChange}
        />
      </div>
      <Card>
        <div className="flex flex-col space-y-2">
          <div className="border-b-mid-gray flex items-center space-x-2 border-b pb-3 pt-1">
            <EntryStatusDropdownFilter
              value={statusFilter}
              onChange={setStatusFilter}
            />
            <YearDropdownFilter
              value={yearFilter}
              onChange={setYearFilter}
              type={dateTypeFilter}
              disableAllYear
            />
          </div>
          <MonthlyBalanceTable
            data={data?.accountMonthlyBalance}
            loading={loading}
          />
        </div>
      </Card>
    </div>
  )
}
