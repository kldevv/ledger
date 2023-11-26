import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Currency, Transaction } from '@prisma/client';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

const data: Transaction[] = [
  {
    id: 1,
    description: 'hello',
    accruedDate: new Date(0),
    currency: Currency.USD,
    createdDate: new Date(0),
    updatedDate: new Date(0),
  },
  {
    id: 2,
    description: 'world',
    accruedDate: new Date(0),
    currency: Currency.USD,
    createdDate: new Date(0),
    updatedDate: new Date(0),
  },
];

const columnHelper = createColumnHelper<Transaction>();


export const TransactionTable: React.FC = () => {
  const { t } = useTranslation('transaction')

  const columns = [
    columnHelper.accessor('id', {
      header: t('table.header.id'),
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    columnHelper.accessor('description', {
      header: t('table.header.description'),
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    columnHelper.accessor('accruedDate', {
      header: 'Date',
      cell: (info) => <span>{info.getValue().toDateString()}</span>,
    }),
  ];

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
          <Link href={`/transaction/${123}`}>
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          </Link>
        ))}
      </tbody>
    </table>
  );
};
