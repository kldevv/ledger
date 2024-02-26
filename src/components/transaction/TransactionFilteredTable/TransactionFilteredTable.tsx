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
  data?: TransactionTableDataModel[]
  /**
   * Loading?
   */
  loading?: boolean
}

const pageSize = 10

export const TransactionFilteredTable: React.FC<
  TransactionFilteredTableProps
> = ({ data, loading }) => {
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
      data?.filter(
        ({ status }) => statusFilter == null || status === statusFilter,
      ),
    [data, statusFilter],
  )

  const paginatedDate = useMemo(() => {
    const indexStart = selectedPage * pageSize

    return filteredData?.slice(indexStart, indexStart + pageSize)
  }, [filteredData, selectedPage])

  const pageCount = useMemo(
    () =>
      filteredData == null ? 0 : Math.ceil(filteredData.length / pageSize),
    [filteredData],
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
        <TransactionTable data={paginatedDate} loading={loading} />
        {pageCount > 1 && (
          <div className="border-t-mid-gray flex w-full items-center justify-center border-t pt-5">
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
