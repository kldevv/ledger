import { useCallback, useState } from 'react'

import { DateType, useGetCategoryTypeMonthlyChangesQuery } from '@/api/graphql'
import {
  Card,
  DateTypeFilterRadioGroup,
  EntryStatusFilterDropdown,
  YearFilterDropdown,
} from '@/components/common'
import { useTreasuryBookContext } from '@/hooks'

import { MonthlyChangesTable } from '..'

import type { EntryStatus } from '@/api/graphql'

export const CategoryTypeMonthlyChangesDataControllerTable: React.FC = () => {
  const { selectedTreasuryBookId } = useTreasuryBookContext()
  const [statusFilter, setStatusFilter] = useState<EntryStatus | null>(null)
  const [yearFilter, setYearFilter] = useState<number | null>(null)
  const [dateTypeFilter, setDateTypeFilter] = useState<DateType>(
    DateType.ACCRUAL,
  )

  const handleOnDateTypeFilterChange = useCallback((value: DateType) => {
    setYearFilter(null)
    setDateTypeFilter(value)
  }, [])

  const { data } = useGetCategoryTypeMonthlyChangesQuery({
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
            />
          </div>
          <MonthlyChangesTable
            data={data?.getCategoryTypeMonthlyChanges ?? []}
          />
        </div>
      </Card>
    </div>
  )
}
