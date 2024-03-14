import { useCallback, useMemo, useState } from 'react'

import { Card, EntryStatusDropdownFilter } from '@/components/core'

import { TransactionTable } from '..'

import type { TransactionTableDataModel } from '..'
import type { EntryStatus } from '@prisma/client'

export interface TransactionFilteredTableProps {
  /**
   * Data
   */
  data?: TransactionTableDataModel[]
  /**
   * Loading?
   */
  loading?: boolean
}

export const TransactionFilteredTable: React.FC<
  TransactionFilteredTableProps
> = ({ data, loading }) => {
  const [statusFilter, setStatusFilter] = useState<EntryStatus | null>(null)

  const handleOnStatusFilterChange = useCallback(
    (value: EntryStatus | null) => {
      setStatusFilter(value)
    },
    [],
  )

  const filteredData = useMemo(
    () =>
      data?.filter(
        ({ status }) => statusFilter == null || status === statusFilter,
      ),
    [data, statusFilter],
  )

  return (
    <Card className="w-full">
      <div className="flex flex-col space-y-3">
        <div className="border-b-mid-gray flex items-center border-b pb-3 pt-1">
          <EntryStatusDropdownFilter
            value={statusFilter}
            onChange={handleOnStatusFilterChange}
          />
        </div>
        <TransactionTable data={filteredData} loading={loading} />
      </div>
    </Card>
  )
}
