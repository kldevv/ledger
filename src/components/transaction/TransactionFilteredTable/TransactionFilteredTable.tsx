import { useCallback, useMemo, useState } from 'react'

import {
  Card,
  EntryStatusDropdownFilter,
  Pagination,
} from '@/components/common'

import { TransactionTable } from '..'

import type { TransactionTableDataModel } from '..'
import type { EntryStatus } from '@prisma/client'

export interface TransactionFilteredTableProps {
  /**
   * Data
   */
  data: TransactionTableDataModel[]
}

const pageSize = 10

export const TransactionFilteredTable: React.FC<
  TransactionFilteredTableProps
> = ({ data }) => {
  const [statusFilter, setStatusFilter] = useState<EntryStatus | null>(null)
  const [selectedPage, setSelectedPage] = useState(0)

  const handleOnStatusFilterChange = useCallback(
    (value: EntryStatus | null) => {
      setStatusFilter(value)
      setSelectedPage(0)
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

  const paginatedDate = useMemo(() => {
    const indexStart = selectedPage * pageSize

    return filteredData.slice(indexStart, indexStart + pageSize)
  }, [filteredData, selectedPage])

  const pageCount = useMemo(
    () => Math.ceil(filteredData.length / pageSize),
    [filteredData.length],
  )

  return (
    <Card>
      <div className="flex flex-col space-y-3">
        <div className="flex items-center border-b pt-1 pb-3 border-b-mid-gray">
          <EntryStatusDropdownFilter
            value={statusFilter}
            onChange={handleOnStatusFilterChange}
          />
        </div>
        <TransactionTable data={paginatedDate} />
        {pageCount > 1 && (
          <div className="border-t border-t-mid-gray w-full flex items-center justify-center pt-5">
            <Pagination
              pageCount={pageCount}
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
          </div>
        )}
      </div>
    </Card>
  )
}
