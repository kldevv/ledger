import { flexRender, type RowData, type Table } from '@tanstack/react-table'
import classNames from 'classnames'

import { ButtonCore, Icon } from '../..'
import { TableHeader } from '../TableHeader/TableHeader'

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
                <ButtonCore
                  onClick={header.column.getToggleSortingHandler()}
                  className={classNames(
                    'hover:text-gray my-2 -ml-3 flex size-full items-center justify-start rounded-lg px-3 py-1',
                    { 'text-gray': header.column.getIsSorted() },
                  )}
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
                </ButtonCore>
              ) : header.isPlaceholder ? null : (
                <div className="select-none py-1 pr-3">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </div>
              )}
            </TableHeader>
          ))}
        </tr>
      ))}
    </thead>
  )
}
