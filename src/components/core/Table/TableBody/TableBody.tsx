import { flexRender, type RowData, type Table } from '@tanstack/react-table'

import { range } from '@/shared'

import { TableCell } from '..'
import { LoadingBox } from '../..'

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
  loading,
}: TableBodyProps<TData>) => {
  if (loading === true) {
    return (
      <tbody>
        {range({ count: 3 }).map((rowIndex) => (
          <tr key={rowIndex}>
            <TableCell variant={rowIndex & 1 ? 'primary' : 'secondary'}>
              {rowIndex}
            </TableCell>
            {range({ count: table.getAllColumns().length }).map(
              (columnIndex) => (
                <TableCell
                  key={columnIndex}
                  variant={rowIndex & 1 ? 'primary' : 'secondary'}
                >
                  <LoadingBox />
                </TableCell>
              ),
            )}
          </tr>
        ))}
      </tbody>
    )
  }

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
