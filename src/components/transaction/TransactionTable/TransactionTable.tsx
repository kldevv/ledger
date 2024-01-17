import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'

import {
  Card,
  EntryStatusFilterDropdown,
  FormattedDate,
  StatusChip,
  Table,
  ViewLink,
} from '@/components/common'

import type { GetTransactionsQuery } from '@/api/graphql'

export type TransactionTableDataModel =
  GetTransactionsQuery['getTransactions'][number]

const columnHelper = createColumnHelper<TransactionTableDataModel>()

export interface TransactionTableProps {
  /**
   * Data
   */
  data: TransactionTableDataModel[]
}

export const TransactionTable: React.FC<TransactionTableProps> = ({ data }) => {
  const { t } = useTranslation('transaction')

  const colDefs = useMemo(
    () => [
      columnHelper.accessor('accrualDate', {
        header: t('TransactionTable.header.date'),
        cell: ({ getValue }) => (
          <div className=" text-dark-shades">
            <FormattedDate dateTime={getValue()} />
          </div>
        ),
      }),
      columnHelper.accessor('note', {
        header: t('TransactionTable.header.note'),
      }),
      columnHelper.accessor('status', {
        header: t('TransactionTable.header.status'),
        cell: ({ getValue }) => <StatusChip status={getValue()} />,
      }),
      columnHelper.accessor('id', {
        header: t('TransactionTable.header.id'),
      }),
      columnHelper.display({
        id: 'view-link',
        cell: ({ row }) => (
          <ViewLink href={`/transaction/${row.getValue<string>('id')}`} />
        ),
      }),
    ],
    [t],
  )

  return <Table data={data} colDefs={colDefs} pageSize={10} />
}
