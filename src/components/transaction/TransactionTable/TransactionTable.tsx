import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import {
  FormattedDate,
  EntryStatusChip,
  Table,
  LinkButton,
  FormattedCurrencyNumber,
} from '@/components/core'
import { route } from '@/shared'

import type { TransactionsQuery } from '@/api/graphql'

export type TransactionTableDataModel =
  TransactionsQuery['transactions'][number]

const columnHelper = createColumnHelper<TransactionTableDataModel>()

export interface TransactionTableProps {
  /**
   * Data
   */
  data?: TransactionTableDataModel[]
  /**
   * Loading?
   */
  loading?: boolean
}

export const TransactionTable: React.FC<TransactionTableProps> = ({
  data,
  loading,
}) => {
  const { t } = useTranslation('journal')

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
        enableSorting: false,
        cell: ({ getValue }) => (
          <LinkButton
            href={{
              pathname: route.journal.details.pathname,
              query: { id: getValue() },
            }}
            label={t`TransactionTable.link.view`}
          />
        ),
      }),
    ],
    [t],
  )

  return <Table data={data} colDefs={colDefs} loading={loading} />
}
