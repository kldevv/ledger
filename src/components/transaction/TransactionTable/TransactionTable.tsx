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

export type TransactionTableProps = {
  /**
   * Data feed for the transactiontable
   */
  transactions: Transaction[]
}

export const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
  const { t } = useTranslation('transaction')

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>{t('table.header.id')}</th>
          <th>{t('table.header.title')}</th>
          <th>{t('table.header.date')}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{transactions.map((transaction) => <TransactionTableRow key={transaction.id} {...transaction} />)}</tbody>
    </table>
  );
};
