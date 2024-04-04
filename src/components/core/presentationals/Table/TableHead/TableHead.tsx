import { flexRender, type RowData, type Table } from '@tanstack/react-table'

import { TableHeader } from '..'
import { Button } from '../../..'
import { Icon } from '../..'

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
                  className="hover:bg-mid-gray/50 my-2 -ml-3 flex size-full items-center justify-start rounded-lg px-3 py-1"
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
                    {Boolean(header.column.getIsSorted()) && (
                      <Icon.Outline
                        name={
                          header.column.getIsSorted() === 'asc'
                            ? 'ChevronDown'
                            : 'ChevronUp'
                        }
                        className="text-gray size-[0.7rem]"
                      />
                    )}
                  </span>
                </Button>
              ) : header.isPlaceholder ? null : (
                <span className="select-none">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </span>
              )}
            </TableHeader>
          ))}
        </tr>
      ))}
    </thead>
  )
}
