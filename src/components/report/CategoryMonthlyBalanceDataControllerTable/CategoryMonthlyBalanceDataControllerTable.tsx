import { useCallback, useState } from 'react'

import { DateType, useGetCategoryMonthlyBalanceQuery } from '@/api/graphql'
import {
  Card,
  DateTypeFilterRadioGroup,
  EntryStatusFilterDropdown,
  YearFilterDropdown,
} from '@/components/common'
import { useTreasuryBookContext } from '@/hooks'

import { MonthlyBalanceTable } from '..'

import type { EntryStatus } from '@/api/graphql'

const currentYear = new Date().getFullYear()

export const CategoryMonthlyBalanceDataControllerTable: React.FC = () => {
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

  const { data } = useGetCategoryMonthlyBalanceQuery({
    variables: {
      input: {
        vaultId: selectedTreasuryBookId ?? '',
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
        <DateTypeFilterRadioGroup
          value={dateTypeFilter}
          onChange={handleOnDateTypeFilterChange}
        />
      </div>
      <Card>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center border-b pt-1 pb-3 border-b-mid-gray space-x-2">
            <EntryStatusFilterDropdown
              value={statusFilter}
              onChange={setStatusFilter}
            />
            <YearFilterDropdown
              value={yearFilter}
              onChange={setYearFilter}
              type={dateTypeFilter}
              disableAllYear
            />
          </div>
          <MonthlyBalanceTable data={data?.getCategoryMonthlyBalance ?? []} />
        </div>
      </Card>
    </div>
  )
}
