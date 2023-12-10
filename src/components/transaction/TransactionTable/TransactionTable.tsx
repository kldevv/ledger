import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { GetAllTransactionsQuery } from '@/api/graphql';
import React from 'react';
import { Card, StatusChip, Table } from '@/components/common';
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
    columnHelper.accessor('accrualDate', {
      header: t('transaction-table.header.date'),
      cell: (props) => {
        const data = props.getValue();
        return (
          <div className="whitespace-nowrap">{`${data.getFullYear()}-${data.getMonth()}-${data.getDay()}`}</div>
        );
      },
    }),
    columnHelper.accessor('tags', {
      header: () => t('transaction-table.header.tags'),
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
  ];

  return (
    <Table data={data} colDefs={columns}/>
  );
};
