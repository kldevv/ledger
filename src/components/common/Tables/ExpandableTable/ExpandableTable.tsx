import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import classNames from 'classnames'
import { useEffect, useState } from 'react'

import { Button, Card, TableCell, TableHeader } from '@/components/common'

import type { ColumnDef, ExpandedState, RowData } from '@tanstack/react-table'

export type ExpandableTableProps<TData extends RowData> = {
  /**
   * ExpandableTable data
   */
  data: TData[]
  /**
   * ExpandableTable column definitions
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  colDefs: ColumnDef<TData, any>[]
  /**
   * Get expanded data from the field of data
   */
  getExpandedData: (row: TData) => TData[]
  /**
   * Col group count
   */
  colGroupCount?: 1 | 2
}

export const ExpandableTable = <TData extends RowData>({
  data,
  colDefs,
  getExpandedData,
  colGroupCount = 2,
}: ExpandableTableProps<TData>): React.ReactElement => {
  const [expanded, setExpanded] = useState<ExpandedState>({})

  const columnHelper = createColumnHelper<TData>()

  const table = useReactTable<TData>({
    data,
    columns: [
      columnHelper.display({
        id: 'expanded',
        cell: ({ row }) =>
          row.getCanExpand() ? (
            <Button onClick={row.getToggleExpandedHandler()}>
              {row.getIsExpanded() ? (
                <ChevronDownIcon className="w-3 h-3" />
              ) : (
                <ChevronRightIcon className="w-3 h-3" />
              )}
            </Button>
          ) : null,
      }),
      ...colDefs,
    ],
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getSubRows: getExpandedData,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  })

  useEffect(() => {
    table.toggleAllRowsExpanded()
  }, [table])

  return (
    <Card>
      <div className="w-full h-full max-w-xl max-h-screen overflow-x-auto">
        <table className="w-full h-full table-auto relative">
          <thead className="sticky top-0 z-30">
            {table.getHeaderGroups().map(({ id, headers }) => (
              <tr key={id}>
                {headers.map((header, index) => (
                  <TableHeader
                    key={header.id}
                    colSpan={header.colSpan}
                    className={classNames(
                      'bg-white',
                      'text-center',
                      index === 0
                        ? 'sticky left-0'
                        : index === 1
                          ? 'sticky left-[2.25rem]'
                          : undefined,
                    )}
                  >
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
            {table.getRowModel().rows.map((row, rowIndex) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell, index) => (
                  <TableCell
                    key={cell.id}
                    className={classNames(
                      'z-20',
                      (colGroupCount === 2 && index & 1) ||
                        (colGroupCount === 1 && index > 0)
                        ? 'border-r border-mid-gray'
                        : undefined,
                      index === 0
                        ? 'sticky left-0'
                        : index === 1
                          ? 'sticky left-[2.25rem]'
                          : undefined,
                      row.depth === 0
                        ? 'bg-light-accent text-light-shades font-semibold'
                        : rowIndex & 1
                          ? 'bg-white'
                          : 'bg-light-shades',
                    )}
                  >
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
