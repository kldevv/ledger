import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { Card, TableCell, TableHeader } from '@/components/common'

import type { ColumnDef, RowData } from '@tanstack/react-table'

export type TableProps<TData extends RowData> = {
  /**
   * Table data
   */
  data: TData[]
  /**
   * Table column definitions
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  colDefs: ColumnDef<TData, any>[]
}

export const Table = <TData extends RowData>({
  data,
  colDefs,
}: TableProps<TData>) => {
  const table = useReactTable({
    data,
    columns: colDefs,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Card>
      <div className="w-full h-full overflow-auto">
        <table className="w-full h-full table-auto">
          <thead>
            {table.getHeaderGroups().map(({ id, headers }) => (
              <tr key={id}>
                {headers.map((header) => (
                  <TableHeader key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHeader>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, index) => (
              <tr
                key={row.id}
                className={index & 1 ? 'bg-white' : 'bg-light-shades'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
