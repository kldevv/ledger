import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import {
  FormattedDate,
  EntryStatusChip,
  Table,
  ViewLink,
  FormattedCurrencyNumber,
} from '@/components/common'

import type { TransactionsQuery } from '@/api/graphql'

export type TransactionTableDataModel =
  TransactionsQuery['transactions'][number]

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
          <div className="text-dark-shades">
            <FormattedDate dateTime={getValue()} />
          </div>
        ),
      }),
      columnHelper.accessor('note', {
        header: t('TransactionTable.header.note'),
      }),
      columnHelper.accessor('status', {
        header: t('TransactionTable.header.status'),
        cell: ({ getValue }) => <EntryStatusChip status={getValue()} />,
      }),
      columnHelper.accessor('amount', {
        header: t`TransactionTable.header.amount`,
        cell: ({ getValue }) => <FormattedCurrencyNumber value={getValue()} />,
      }),
      columnHelper.accessor('createdAt', {
        header: t`TransactionTable.header.createdAt`,
        cell: ({ getValue }) => <FormattedDate dateTime={getValue()} />,
      }),
      columnHelper.accessor('id', {
        id: 'view-link',
        header: '',
        cell: ({ getValue }) => (
          <ViewLink href={`/transaction/${getValue()}`} />
        ),
      }),
    ],
    [t],
  )

  return <Table data={data} colDefs={colDefs} />
}
