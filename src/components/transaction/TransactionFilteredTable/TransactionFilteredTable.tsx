import { useMemo, useState } from 'react'

import { Card, EntryStatusFilterDropdown } from '@/components/common'

import { TransactionTable } from '..'

import type { TransactionTableDataModel } from '..'
import type { EntryStatus } from '@prisma/client'

export interface TransactionFilteredTableProps {
  /**
   * Data
   */
  data: TransactionTableDataModel[]
}

export const TransactionFilteredTable: React.FC<
  TransactionFilteredTableProps
> = ({ data }) => {
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
        <TransactionTable data={filteredData} />
      </div>
    </Card>
  )
}
