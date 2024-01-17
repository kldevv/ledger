import { useMemo, useState } from 'react'

import { Card, EntryStatusFilterDropdown } from '@/components/common'

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
        <div className="flex items-center border-b pt-1 pb-3 border-b-mid-gray">
          <EntryStatusFilterDropdown
            value={statusFilter}
            onChange={setStatusFilter}
          />
        </div>
        <EntryTable data={filteredData} />
      </div>
    </Card>
  )
}
