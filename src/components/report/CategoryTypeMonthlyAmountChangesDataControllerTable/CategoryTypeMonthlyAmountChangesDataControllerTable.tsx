import { useState } from 'react'

import {
  DateType,
  useGetCategoryTypeMonthlyAmountChangesQuery,
} from '@/api/graphql'
import {
  Card,
  DateTypeFilterRadioGroup,
  EntryStatusFilterDropdown,
  YearFilterDropdown,
} from '@/components/common'
import { useTreasuryBookContext } from '@/hooks'

import { MonthlyAmountChangesTable } from '..'

import type { EntryStatus } from '@/api/graphql'

export const CategoryTypeMonthlyAmountChangesDataControllerTable: React.FC =
  () => {
    const { selectedTreasuryBookId } = useTreasuryBookContext()
    const [statusFilter, setStatusFilter] = useState<EntryStatus | null>(null)
    const [yearFilter, setYearFilter] = useState<number | null>(null)
    const [dateTypeFilter, setDateTypeFilter] = useState<DateType>(
      DateType.ACCRUAL,
    )

    const { data } = useGetCategoryTypeMonthlyAmountChangesQuery({
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
            onChange={setDateTypeFilter}
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
            <MonthlyAmountChangesTable
              data={data?.getCategoryTypeMonthlyAmountChanges ?? []}
            />
          </div>
        </Card>
      </div>
    )
  }
