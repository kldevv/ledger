import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { FormattedDate, StatusChip, Table } from '@/components/common'

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
      }),
      columnHelper.accessor('credit', {
        header: t('EntryTable.header.credit'),
      }),
      columnHelper.accessor('account.name', {
        header: t('EntryTable.header.account'),
      }),
      columnHelper.accessor('memo', {
        header: t('EntryTable.header.memo'),
      }),
      columnHelper.accessor('status', {
        header: t('EntryTable.header.status'),
        cell: (props) => <StatusChip status={props.getValue()} />,
      }),
      columnHelper.accessor('id', {
        header: t('EntryTable.header.id'),
      }),
      columnHelper.accessor('transactionId', {
        header: t('EntryTable.header.transaction'),
      }),
    ],
    [t],
  )

  return <Table data={data} colDefs={colDefs} pageSize={10} />
}
