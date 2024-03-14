import { useCallback, useMemo, useState } from 'react'

import { Card, EntryStatusDropdownFilter } from '@/components/core'

import { EntryTable } from '..'

import type { EntryTableData } from '..'
import type { EntryStatus } from '@/api/graphql'

export interface EntryFilteredTableProps {
  /**
   * Data
   */
  data: EntryTableData[]
}

export const EntryFilteredTable: React.FC<EntryFilteredTableProps> = ({
  data,
}) => {
  const [statusFilter, setStatusFilter] = useState<EntryStatus | null>(null)

  const handleOnStatusFilterChange = useCallback(
    (value: EntryStatus | null) => {
      setStatusFilter(value)
    },
    [],
  )

  const filteredData = useMemo(
    () =>
      data.filter(
        ({ status }) => statusFilter == null || status === statusFilter,
      ),
    [data, statusFilter],
  )

  return (
    <Card>
      <div className="flex flex-col space-y-3">
        <div className="border-b-mid-gray flex items-center border-b pb-3 pt-1">
          <EntryStatusDropdownFilter
            value={statusFilter}
            onChange={handleOnStatusFilterChange}
          />
        </div>
        <EntryTable data={filteredData} />
      </div>
    </Card>
  )
}
