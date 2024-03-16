import { flexRender, type RowData, type Table } from '@tanstack/react-table'

import { TableHeader } from '..'
import { Button, Icon } from '../..'

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
          {/* extra table header for the index column */}
          <TableHeader />
          {headers.map((header) => (
            <TableHeader key={header.id} colSpan={header.colSpan}>
              {header.column.getCanSort() ? (
                <Button
                  onClick={header.column.getToggleSortingHandler()}
                  className="hover:bg-mid-gray/50 flex size-full items-center rounded-lg px-3 py-1"
                >
                  <span>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </span>
                  <span className="ml-auto pl-2">
                    {header.column.getIsSorted() === 'asc' ? (
                      <Icon.Outline
                        name="ChevronDown"
                        className="text-gray size-[0.75rem]"
                        stroke={1.5}
                      />
                    ) : header.column.getIsSorted() === 'desc' ? (
                      <Icon.Outline
                        name="ChevronUp"
                        stroke={1.5}
                        className="text-gray size-[0.75rem]"
                      />
                    ) : null}
                  </span>
                </Button>
              ) : header.isPlaceholder ? null : (
                flexRender(header.column.columnDef.header, header.getContext())
              )}
            </TableHeader>
          ))}
        </tr>
      ))}
    </thead>
  )
}
