import {
  Card,
  DateStandardFilter,
  DateTypeRadioGroupFilter,
  ElementTypeFilter,
  EntryStatusDropdownFilter,
  Table,
  YearDropdownFilter,
  useCurrentBranch,
} from '@/components/core'
import { useTotalDebitAndCreditOverTheMonthsTableColumn } from '../..'
import {
  DateStandard,
  ElementType,
  EntryStatus,
  useTotalDebitAndCreditOverTheMonthsQuery,
} from '@/api/graphql'
import { useCallback, useState } from 'react'

type FilterSchema = {
  year: number | null
  status: EntryStatus | null
  standard: DateStandard
  groupByElement: ElementType
}

export const TotalDebitAndCreditOverTheMonthsTable: React.FC = () => {
  const [currentBranch] = useCurrentBranch()
  const colDefs = useTotalDebitAndCreditOverTheMonthsTableColumn()
  const [filter, setFilter] = useState<FilterSchema>({
    year: null,
    status: null,
    standard: DateStandard.ACCRUAL,
    groupByElement: ElementType.ACCOUNT,
  })

  const { data } = useTotalDebitAndCreditOverTheMonthsQuery({
    variables: {
      input: {
        branchId: currentBranch?.id ?? '',
        ...filter,
      },
    },
    skip: !currentBranch,
  })

  const handleEntryStatusChange = useCallback(
    (status: EntryStatus | null) => setFilter((prev) => ({ ...prev, status })),
    [],
  )

  const handleElementTypeChange = useCallback(
    (groupByElement: ElementType) =>
      setFilter((prev) => ({ ...prev, groupByElement })),
    [],
  )

  const handleStandardChange = useCallback(
    (standard: DateStandard) =>
      setFilter((prev) => ({ ...prev, year: null, standard })),
    [],
  )

  const handleYearChange = useCallback(
    (year: number | null) => setFilter((prev) => ({ ...prev, year })),
    [],
  )

  return (
    <Card>
      <div className="mb-4 border-b border-mid-gray pb-4 flex space-x-2">
        <DateStandardFilter
          value={filter.standard}
          onChange={handleStandardChange}
        />
        <ElementTypeFilter
          value={filter.groupByElement}
          onChange={handleElementTypeChange}
        />
        <EntryStatusDropdownFilter
          value={filter.status}
          onChange={handleEntryStatusChange}
        />
        <YearDropdownFilter
          value={filter.year}
          onChange={handleYearChange}
          type={filter.standard}
        />
      </div>
      <Table
        data={data?.totalDebitAndCreditOverTheMonths ?? []}
        colDefs={colDefs}
        enabledPagination={false}
      />
    </Card>
  )
}
