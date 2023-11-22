import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Transaction } from '@prisma/client';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

const columnHelper = createColumnHelper<Transaction>();

export type TransactionTableProps = {
  /**
   * Data feed for the transactiontable
   */
  data: Transaction[]
}

export const TransactionTable: React.FC<TransactionTableProps> = ({ data }) => {
  const { t } = useTranslation()

  const columns = useMemo(() => [
    columnHelper.accessor('title', {
      header: 'Title',
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    columnHelper.accessor('accruedDate', {
      header: 'Date',
      cell: (info) => <span>{`${info.getValue()}`}</span>,
    }),
    columnHelper.accessor('id', {
      header: 'Id',
      cell: (info) => <span>{`${info.getValue()}`}</span>,
    }),
  ], []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
