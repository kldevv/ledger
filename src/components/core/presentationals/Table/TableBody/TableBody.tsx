import { flexRender, type RowData, type Table } from '@tanstack/react-table'

import { TableCell } from '..'

export interface TableBodyProps<TData extends RowData> {
  /**
   * Table
   */
  table: Table<TData>
  /**
   * Loading?
   */
  loading?: boolean
}

export const TableBody = <TData extends RowData>({
  table,
}: TableBodyProps<TData>) => {
  const { pageSize, pageIndex } = table.getState().pagination

  return (
    <tbody>
      {table.getRowModel().rows.map((row, index) => (
        <tr key={row.id}>
          <TableCell variant={index & 1 ? 'primary' : 'secondary'}>
            {pageIndex * pageSize + index}
          </TableCell>
          {row.getVisibleCells().map((cell) => (
            <TableCell
              key={cell.id}
              variant={index & 1 ? 'primary' : 'secondary'}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </tr>
      ))}
    </tbody>
  )
}
