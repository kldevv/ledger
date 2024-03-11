import { flexRender, type RowData, type Table } from '@tanstack/react-table'

import { TableHeader } from '..'

export interface TableHeadProps<TData extends RowData> {
  /**
   * Table
   */
  table: Table<TData>
}

export const TableHead = <TData extends RowData>({
  table,
}: TableHeadProps<TData>) => {
  return (
    <thead>
      {table.getHeaderGroups().map(({ id, headers }) => (
        <tr key={id}>
          <TableHeader />
          {headers.map((header) => (
            <TableHeader key={header.id} colSpan={header.colSpan}>
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
  )
}
