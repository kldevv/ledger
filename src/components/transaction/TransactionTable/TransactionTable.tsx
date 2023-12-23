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
      header: t('TransactionTable.header.id'),
    }),
    columnHelper.accessor('accrualDate', {
      header: t('TransactionTable.header.date'),
      cell: (props) => (
        <div className="whitespace-nowrap text-dark-shades">
          <FormattedDate dateTime={props.getValue()} />
        </div>
      ),
    }),
    columnHelper.accessor('status', {
      header: t('TransactionTable.header.status'),
      cell: (props) => <StatusChip status={props.getValue()} />,
    }),
    columnHelper.accessor('note', {
      header: t('TransactionTable.header.note'),
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
