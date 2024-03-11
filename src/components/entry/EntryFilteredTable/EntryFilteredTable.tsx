import { useCallback, useMemo, useState } from 'react'

import { Card, EntryStatusDropdownFilter, Pagination } from '@/components/core'

import { EntryTable } from '..'

import type { EntryTableData } from '..'
import type { EntryStatus } from '@/api/graphql'

export interface EntryFilteredTableProps {
  /**
   * Data
   */
  data: EntryTableData[]
}

const pageSize = 10

export const EntryFilteredTable: React.FC<EntryFilteredTableProps> = ({
  data,
}) => {
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
        <div className="border-b-mid-gray flex items-center border-b pb-3 pt-1">
          <EntryStatusDropdownFilter
            value={statusFilter}
            onChange={handleOnStatusFilterChange}
          />
        </div>
        <EntryTable data={paginatedDate} />
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
