import { useCallback, useState } from 'react'

import { DateType, useCategoryMonthlyChangesQuery } from '@/api/graphql'
import {
  Card,
  DateTypeRadioGroupFilter,
  EntryStatusDropdownFilter,
  YearDropdownFilter,
} from '@/components/common'
import { useTreasuryBookContext } from '@/hooks'

import { MonthlyChangesTable } from '..'

import type { EntryStatus } from '@/api/graphql'

export const CategoryMonthlyChangesDataControllerTable: React.FC = () => {
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

  const { data } = useCategoryMonthlyChangesQuery({
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
            />
          </div>
          <MonthlyChangesTable data={data?.categoryMonthlyChanges ?? []} />
        </div>
      </Card>
    </div>
  )
}
