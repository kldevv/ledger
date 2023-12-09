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
import { StatusChip } from '@/components/common';
import { Cell } from './Cell';
import { Header } from './Header';

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
    status: 'COMPLETED',
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
        <Header variant="start">
          {t('transaction-table.header.description')}
        </Header>
      ),
      cell: (props) => (
        <Cell variant="start">
          <div className="font-medium text-darkShades overflow-hidden overflow-ellipsis whitespace-nowrap">
            SubjectSubjectSubjectSubjectSubjectSubject Subject
          </div>
          <div className="text-xs font-normal text-darkMidGray mt-1 overflow-hidden overflow-ellipsis whitespace-nowrap">
            {props.getValue()}
          </div>
        </Cell>
      ),
    }),
    columnHelper.accessor('accrualDate', {
      header: () => <Header>{t('transaction-table.header.date')}</Header>,
      cell: (props) => {
        const data = props.getValue();
        return (
          <Cell>
            <div className="whitespace-nowrap">{`${data.getFullYear()}-${data.getMonth()}-${data.getDay()}`}</div>
          </Cell>
        );
      },
    }),
    columnHelper.accessor('amount', {
      header: () => <Header>{t('transaction-table.header.amount')}</Header>,
      cell: (props) => <Cell>{props.getValue()}</Cell>,
    }),
    columnHelper.accessor('count', {
      header: () => <Header>{t('transaction-table.header.count')}</Header>,
      cell: (props) => <Cell>{props.getValue()}</Cell>,
    }),
    columnHelper.accessor('status', {
      header: () => <Header>{t('transaction-table.header.status')}</Header>,
      cell: (props) => (
        <Cell>
          <StatusChip status={props.getValue()} />
        </Cell>
      ),
    }),
    columnHelper.accessor('tags', {
      header: () => <Header>{t('transaction-table.header.tags')}</Header>,
      cell: (props) => (
        <td className="p-3 text-sm text-right text-darkMidGray">
          <div className="flex gap-1 text-xs text-left flex-col">
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
      header: () => <Header>{t('transaction-table.header.id')}</Header>,
      cell: (props) => <Cell>{props.getValue()}</Cell>,
    }),
    columnHelper.display({
      id: 'view',
      header: () => <Header />,
      cell: (props) => (
        <Cell>
          <Link
            className={'text-lightAccent'}
            href={`/transaction/${props.row.getValue('id')}`}
          >
            View
          </Link>
        </Cell>
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
      <div className="max-w-screen-lg">
        <table>
          <thead className="border-b border-midGray">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <React.Fragment key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </React.Fragment>
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
