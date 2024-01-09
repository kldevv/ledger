import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { Card, Cell, Header } from '@/components/common'

import type { ColumnDef, RowData } from '@tanstack/react-table'

export type TableProps<TData extends RowData> = {
  /**
   * Table data
   */
  data: TData[]
  /**
   * Table column definitions
   */
  colDefs: ColumnDef<TData>[]
}

export const Table = <TData extends RowData>({
  data,
  colDefs,
}: TableProps<TData>): React.ReactElement => {
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
                  <Header key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </Header>
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
                  <Cell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Cell>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
