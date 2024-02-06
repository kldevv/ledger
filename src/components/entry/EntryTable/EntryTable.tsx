import { createColumnHelper } from '@tanstack/react-table'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import {
  FormattedDate,
  EntryStatusChip,
  Table,
  FormattedCurrencyNumber,
} from '@/components/common'
import { route } from '@/lib'

import type { EntriesQuery } from '@/api/graphql'

export type EntryTableData = EntriesQuery['entries'][number]

const columnHelper = createColumnHelper<EntryTableData>()

export type EntryTableProps = {
  /**
   * Data
   */
  data: EntryTableData[]
}

export const EntryTable: React.FC<EntryTableProps> = ({ data }) => {
  const { t } = useTranslation('entry')

  const colDefs = useMemo(
    () => [
      columnHelper.accessor('transactionDate', {
        header: t('EntryTable.header.date'),
        cell: (props) => (
          <FormattedDate
            dateTime={props.getValue()}
            className="text-dark-shades"
          />
        ),
      }),
      columnHelper.accessor('debit', {
        header: t('EntryTable.header.debit'),
        cell: ({ getValue }) => <FormattedCurrencyNumber value={getValue()} />,
      }),
      columnHelper.accessor('credit', {
        header: t('EntryTable.header.credit'),
        cell: ({ getValue }) => <FormattedCurrencyNumber value={getValue()} />,
      }),
      columnHelper.accessor('account', {
        header: t`EntryTable.header.account`,
        cell: ({ getValue }) => (
          <Link
            href={{
              pathname: route.accountDetail.pathname,
              query: { id: getValue()?.id },
            }}
            className="hover:text-light-accent"
          >
            {getValue()?.name}
          </Link>
        ),
      }),
      columnHelper.accessor('memo', {
        header: t('EntryTable.header.memo'),
      }),
      columnHelper.accessor('status', {
        header: t('EntryTable.header.status'),
        cell: (props) => <EntryStatusChip status={props.getValue()} />,
      }),
      columnHelper.accessor('createdAt', {
        header: t`EntryTable.header.createdAt`,
        cell: ({ getValue }) => <FormattedDate dateTime={getValue()} />,
      }),
      columnHelper.accessor('transactionId', {
        header: t`EntryTable.header.transaction`,
        cell: ({ getValue }) => (
          <Link
            href={{
              pathname: route.transactionDetail.pathname,
              query: { id: getValue() },
            }}
            className="hover:text-light-accent"
          >
            <div className="max-w-28 truncate">{getValue()}</div>
          </Link>
        ),
      }),
    ],
    [t],
  )

  return <Table data={data} colDefs={colDefs} />
}
