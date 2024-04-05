import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'

import { Icon, Pagination, Spinner } from '..'

import { TableBody } from './TableBody/TableBody'
import { TableHead } from './TableHead/TableHead'

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
  loading = false,
  enabledPagination = true,
}: TableProps<TData>) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const { t } = useTranslation('common')

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
        {loading ? (
          <tbody>
            <tr>
              <td colSpan={colDefs.length + 1}>
                <div className="flex h-60 w-full items-center justify-center">
                  <Spinner className="size-14" />
                </div>
              </td>
            </tr>
          </tbody>
        ) : data && data.length > 0 ? (
          <TableBody table={table} />
        ) : (
          <tbody>
            <tr>
              <td colSpan={colDefs.length + 1}>
                <div className="text-gray flex w-full items-center justify-center space-x-1 py-20 text-sm font-normal">
                  <span>
                    <Icon.Solid
                      className="text-light-accent/50"
                      name="ExclamationCircle"
                    />
                  </span>
                  <span>{t`table.empty`}</span>
                </div>
              </td>
            </tr>
          </tbody>
        )}
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
