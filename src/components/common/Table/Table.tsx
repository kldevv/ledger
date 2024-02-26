import { getCoreRowModel, useReactTable } from '@tanstack/react-table'

import { TableBody } from './TableBody'
import { TableHead } from './TableHead'

import type { ColumnDef, RowData } from '@tanstack/react-table'

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
  const table = useReactTable({
    data: data ?? [],
    columns: colDefs,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="size-full max-w-full overflow-auto">
      <table className="size-full table-auto">
        <TableHead table={table} />
        <TableBody table={table} loading={loading} />
      </table>
    </div>
  )
}
