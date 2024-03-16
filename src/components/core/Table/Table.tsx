import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useMemo, useState } from 'react'

import { Pagination } from '..'

import { TableBody } from './TableBody'
import { TableHead } from './TableHead'

import type { ColumnDef, RowData, SortingState } from '@tanstack/react-table'

export type TableProps<TData extends RowData> = {
  /**
   * Table data
   */
  data?: TData[]
  /**
   * Table column definitions
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  colDefs: ColumnDef<TData, any>[]
  /**
   * Loading?
   */
  loading?: boolean
  /**
   * Pagination?
   */
  enabledPagination?: boolean
}

export const Table = <TData extends RowData>({
  data,
  colDefs,
  loading,
  enabledPagination = true,
}: TableProps<TData>) => {
  const [sorting, setSorting] = useState<SortingState>([])

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const pageCount = useMemo(
    () => Math.ceil((data?.length ?? 0) / pagination.pageSize),
    [data?.length, pagination.pageSize],
  )

  const table = useReactTable({
    data: data ?? [],
    columns: colDefs,
    state: {
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    manualPagination: !enabledPagination,
  })

  return (
    <div className="size-full overflow-auto">
      <table className="size-full table-auto">
        <TableHead table={table} />
        <TableBody table={table} loading={loading} />
      </table>
      {pageCount > 1 && enabledPagination && (
        <div className="border-t-mid-gray flex w-full items-center justify-center border-t pt-5">
          <Pagination
            pageCount={pageCount}
            selectedPage={pagination.pageIndex}
            setSelectedPage={table.setPageIndex}
          />
        </div>
      )}
    </div>
  )
}
