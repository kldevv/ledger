import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { GetAllTransactionsQuery } from '@/api/graphql';
import React from 'react';

type TransactionTableDataModel = GetAllTransactionsQuery['getAllTransactions'][0]

const columnHelper = createColumnHelper<TransactionTableDataModel>();

const data: TransactionTableDataModel[] = [
  {
    id: '0001',
    accrualDate: new Date(Date.now()),
    subject: 'Ferrari',
    description: 'Buy a Ferrari',
    amount: 100,
    count: 2,
    status: 'PENDING',
    tags: [],
  },
  {
    id: '0002',
    accrualDate: new Date(Date.now()),
    subject: 'McClaren',
    description: 'A very very very very very very very very long description',
    amount: 200,
    count: 3,
    status: 'PENDING',
    tags: [{ id: '1', name: 'Car' }],
  },
  {
    id: '0002',
    accrualDate: new Date(Date.now()),
    subject: 'McClaren',
    description: 'A very very very very very very very very long description',
    amount: 200,
    count: 3,
    status: 'PENDING',
    tags: [{ id: '1', name: 'Car' }],
  },
  {
    id: '0002',
    accrualDate: new Date(Date.now()),
    subject: 'McClaren',
    description: 'A very very very very very very very very long description',
    amount: 200,
    count: 3,
    status: 'PENDING',
    tags: [{ id: '1', name: 'Car' }],
  },
  {
    id: '0002',
    accrualDate: new Date(Date.now()),
    subject: 'McClaren',
    description: 'A very very very very very very very very long description',
    amount: 200,
    count: 3,
    status: 'PENDING',
    tags: [{ id: '1', name: 'Car' }],
  },
  {
    id: '0002',
    accrualDate: new Date(Date.now()),
    subject: 'McClaren',
    description: 'A very very very very very very very very long description',
    amount: 200,
    count: 3,
    status: 'PENDING',
    tags: [{ id: '1', name: 'Car' }],
  },
  {
    id: '0002',
    accrualDate: new Date(Date.now()),
    subject: 'McClaren',
    description: 'A very very very very very very very very long description',
    amount: 200,
    count: 3,
    status: 'PENDING',
    tags: [{ id: '1', name: 'Car' }],
  },
  {
    id: '0002',
    accrualDate: new Date(Date.now()),
    subject: 'McClaren',
    description: 'A very very very very very very very very long description',
    amount: 200,
    count: 3,
    status: 'PENDING',
    tags: [
      { id: '1', name: 'Car' },
      { id: '1', name: 'Expensive' },
    ],
  },
  {
    id: '0002',
    accrualDate: new Date(Date.now()),
    subject: 'McClaren',
    description: 'A very very very very very very very very long description',
    amount: 200,
    count: 3,
    status: 'PENDING',
    tags: [
      { id: '1', name: 'Car' },
      { id: '1', name: 'Expensive' },
    ],
  },
  {
    id: '0002',
    accrualDate: new Date(Date.now()),
    subject: 'McClaren',
    description: 'A very very very very very very very very long description',
    amount: 200,
    count: 3,
    status: 'PENDING',
    tags: [
      { id: '1', name: 'Car' },
      { id: '1', name: 'Expensive' },
    ],
  },
  {
    id: '0002',
    accrualDate: new Date(Date.now()),
    subject: 'McClaren',
    description: 'A very very very very very very very very long description',
    amount: 200,
    count: 3,
    status: 'PENDING',
    tags: [
      { id: '1', name: 'Car' },
      { id: '1', name: 'Expensive' },
    ],
  },
  {
    id: '0002',
    accrualDate: new Date(Date.now()),
    subject: 'McClaren',
    description: 'A very very very very very very very very long description',
    amount: 200,
    count: 3,
    status: 'PENDING',
    tags: [
      { id: '1', name: 'Car' },
      { id: '1', name: 'Expensive' },
    ],
  },
];

export const TransactionTable: React.FC = () => {
  const { t } = useTranslation('transaction')

  const columns = [
    columnHelper.accessor('description', {
      header: () => (
        <div className="text-darkShades text-left font-semibold text-sm pr-3 py-3.5">
          {t('table.header.description')}
        </div>
      ),
      cell: (props) => (
        <td className="pr-3 py-3 text-sm w-28">
          <div className="w-24 font-medium text-darkShades overflow-hidden overflow-ellipsis whitespace-nowrap">
            SubjectSubjectSubjectSubjectSubjectSubject Subject
          </div>
          <div className="w-24 text-xs font-normal text-darkMidGray mt-1 overflow-hidden overflow-ellipsis whitespace-nowrap">
            {props.getValue()}
          </div>
        </td>
      ),
    }),
    columnHelper.accessor('accrualDate', {
      header: () => (
        <div className="text-darkShades text-right font-semibold text-sm py-3.5 px-3">
          Date
        </div>
      ),
      cell: (props) => (
        <td className="p-3 text-sm text-right text-darkMidGray">
          {props.getValue().toLocaleDateString()}
        </td>
      ),
    }),
    columnHelper.accessor('amount', {
      header: () => (
        <div className="text-darkShades text-right font-semibold text-sm py-3.5 px-3">
          Amount
        </div>
      ),
      cell: (props) => (
        <td className="p-3 text-sm text-right text-darkMidGray">
          {props.getValue()}
        </td>
      ),
    }),
    columnHelper.accessor('count', {
      header: () => (
        <div className="text-darkShades text-right font-semibold text-sm py-3.5 px-3">
          Count
        </div>
      ),
      cell: (props) => (
        <td className="p-3 text-sm text-right text-darkMidGray">
          {props.getValue()}
        </td>
      ),
    }),
    columnHelper.accessor('status', {
      header: () => (
        <div className="text-darkShades text-right font-semibold text-sm py-3.5 px-3">
          Status
        </div>
      ),
      cell: (props) => (
        <td className="p-3 text-sm text-right text-darkMidGray">
          {props.getValue()}
        </td>
      ),
    }),
    columnHelper.accessor('tags', {
      header: () => (
        <div className="text-darkShades text-right font-semibold text-sm py-3.5 px-3">
          Tags
        </div>
      ),
      cell: (props) => (
        <td className="p-3 text-sm text-right text-darkMidGray">
          <div className="flex gap-1 text-xs text-left flex-col items-end">
            {props.getValue().map((tag) => (
              <Link href={`/tag/${tag.id}`}>
                <div className="max-w-fit rounded-xl bg-lightAccent py-1 px-3 text-lightShades">
                  {tag.name}
                </div>
              </Link>
            ))}
          </div>
        </td>
      ),
    }),
    columnHelper.accessor('id', {
      header: () => (
        <div className="text-darkShades text-right font-semibold text-sm py-3.5 px-3">
          ID
        </div>
      ),
      cell: (props) => (
        <td className="p-3 text-sm text-right text-darkMidGray">
          {props.getValue()}
        </td>
      ),
    }),
    columnHelper.display({
      id: 'view',
      header: () => (
        <div className="text-darkShades text-right font-semibold text-sm pr-3 py-3.5 px-3" />
      ),
      cell: (props) => (
        <td className="pr-3 py-3 text-sm text-right text-lightAccent">
          <Link href={`/transaction/${props.row.getValue('id')}`}>View</Link>
        </td>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flow-root">
      <div className="max-w-screen-md max-h-screen overflow-auto">
        <table>
          <thead className="border-b border-midGray">
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
              <tr key={row.id} className="border-b border-midGray">
                {row.getVisibleCells().map((cell) => (
                  <React.Fragment key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </React.Fragment>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
