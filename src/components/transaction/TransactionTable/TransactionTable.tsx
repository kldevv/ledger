import { createColumnHelper } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { GetAllTransactionsQuery } from '@/api/graphql';
import React from 'react';
import { StatusChip, Table } from '@/components/common';
import { formatter } from '@/lib';
import { useFormatter } from '@/hooks';

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
  const { formatDate } = useFormatter()

  const columns = [
    columnHelper.accessor('id', {
      header: t('transaction-table.header.id'),
    }),
    columnHelper.accessor('accrualDate', {
      header: t('transaction-table.header.date'),
      cell: (props) => (
        <div className="whitespace-nowrap text-darkShades">{formatDate(props.getValue())}</div>
      ),
    }),
    columnHelper.accessor('count', {
      header: t('transaction-table.header.count'),
    }),
    columnHelper.accessor('description', {
      header: t('transaction-table.header.description'),
    }),
    columnHelper.accessor('status', {
      header: t('transaction-table.header.status'),
      cell: (props) => <StatusChip status={props.getValue()} />,
    }),
    // columnHelper.accessor('tags', {
    //   header: () => t('transaction-table.header.tags'),
    //   cell: (props) => (
    //     <div className="flex gap-1 text-xs text-left flex-col">
    //       {props.getValue().map((tag) => (
    //         <Link href={`/tag/${tag.id}`}>
    //           <div className="max-w-fit rounded-xl bg-light-accent py-1 px-1 text-lightShades">
    //             {tag.name}
    //           </div>
    //         </Link>
    //       ))}
    //     </div>
    //   ),
    // }),
    columnHelper.display({
      id: 'view',
      cell: (props) => (
        <Link
          className="text-light-accent"
          href={`/transaction/${props.row.getValue('id')}`}
        >
          View
        </Link>
      ),
    }),
  ];

  return (
    <Table data={data} colDefs={columns}/>
  );
};
