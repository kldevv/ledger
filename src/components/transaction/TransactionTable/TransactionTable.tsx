import { createColumnHelper } from '@tanstack/react-table';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { FormattedDate, StatusChip, Table, ViewLink } from '@/components/common';
import { GetTransactionsQuery } from '@/api/graphql';

export type TransactionTableDataModel =
  GetTransactionsQuery['getTransactions'][number]

const columnHelper = createColumnHelper<TransactionTableDataModel>();

export interface TransactionTable {
  /**
   * Data
   */
  data: TransactionTableDataModel[];
}

export const TransactionTable: React.FC<TransactionTable> = ({ data }) => {
  const { t } = useTranslation('transaction')

  const colDefs = [
    columnHelper.accessor('id', {
      header: t('transaction-table.header.id'),
    }),
    columnHelper.accessor('accrualDate', {
      header: t('transaction-table.header.date'),
      cell: (props) => (
        <div className="whitespace-nowrap text-dark-shades">
          <FormattedDate dateTime={props.getValue()} />
        </div>
      ),
    }),
    columnHelper.accessor('status', {
      header: t('transaction-table.header.status'),
      cell: (props) => <StatusChip status={props.getValue() ?? ''} />,
    }),
    columnHelper.accessor('note', {
      header: t('transaction-table.header.note'),
    }),
    columnHelper.display({
      id: 'view',
      cell: (props) => (
        <ViewLink href={`/transaction/${props.row.getValue('id')}`} />
      ),
    }),
  ];

  return <Table data={data} colDefs={colDefs} />;
};
