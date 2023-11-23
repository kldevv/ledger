import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Transaction } from '@prisma/client';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { TransactionTableRow } from './Row';

const columnHelper = createColumnHelper<Transaction>();

export type TransactionTableProps = {
  /**
   * Data feed for the transactiontable
   */
  data: Transaction[]
}

export const TransactionTable: React.FC<TransactionTableProps> = ({ data }) => {
  const { t } = useTranslation('transaction')

  const columns = useMemo(
    () => [
      columnHelper.accessor('title', {
        header: t('transactionTable.header.title'),
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('accruedDate', {
        header: t('transactionTable.header.date'),
        cell: (info) => <span>{`${info.getValue()}`}</span>,
      }),
      columnHelper.accessor('id', {
        header: t('transactionTable.header.id'),
        cell: (info) => <span>{`${info.getValue()}`}</span>,
      }),
    ],
    []
  );

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
        {table.getRowModel().rows.map((row) => <TransactionTableRow row={row} />)}
      </tbody>
    </table>
  );
};
