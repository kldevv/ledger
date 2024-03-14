import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'

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
}

export const Table = <TData extends RowData>({
  data,
  colDefs,
  loading,
}: TableProps<TData>) => {
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data: data ?? [],
    columns: colDefs,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className="size-full overflow-auto">
      <table className="size-full table-auto">
        <TableHead table={table} />
        <TableBody table={table} loading={loading} />
      </table>
    </div>
  )
}
