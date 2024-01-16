import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useMemo, useState } from 'react'

import { Pagination, TableCell, TableHeader } from '@/components/common'

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
  /**
   * Page size if paginated, no pagination if undefined
   */
  pageSize?: number
}

export const Table = <TData extends RowData>({
  data,
  colDefs,
  pageSize,
}: TableProps<TData>) => {
  const columnHelper = createColumnHelper<TData>()

  const [selectedPage, setSelectedPage] = useState(0)

  const paginatedDate = useMemo(() => {
    if (pageSize == null) {
      return data
    }

    const indexStart = selectedPage * pageSize

    return data.slice(indexStart, indexStart + pageSize)
  }, [data, pageSize, selectedPage])

  const table = useReactTable({
    data: paginatedDate,
    columns: [
      columnHelper.display({
        id: 'index',
        cell: ({ row }) => row.index,
      }),
      ...colDefs,
    ],
    getCoreRowModel: getCoreRowModel(),
  })

  return (
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
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className={index & 1 ? 'bg-white' : 'bg-light-shades'}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {pageSize != null && (
        <div className="border-t border-t-mid-gray w-full flex items-center justify-center pt-5">
          <Pagination
            pageCount={Math.ceil(data.length / pageSize)}
            onChange={setSelectedPage}
          />
        </div>
      )}
    </div>
  )
}
