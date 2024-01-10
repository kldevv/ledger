import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { FormattedDate, StatusChip, Table, ViewLink } from '@/components/common'

import type { GetTransactionsQuery } from '@/api/graphql'

export type TransactionTableDataModel =
  GetTransactionsQuery['getTransactions'][number]

const columnHelper = createColumnHelper<TransactionTableDataModel>()

export interface TransactionTable {
  /**
   * Data
   */
  data: TransactionTableDataModel[]
}

export const TransactionTable: React.FC<TransactionTable> = ({ data }) => {
  const { t } = useTranslation('transaction')

  const colDefs = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: t('TransactionTable.header.id'),
      }),
      columnHelper.accessor('accrualDate', {
        header: t('TransactionTable.header.date'),
        cell: (props) => (
          <div className=" text-dark-shades">
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
        id: 'view-link',
        cell: (props) => (
          <ViewLink href={`/transaction/${props.row.getValue<string>('id')}`} />
        ),
      }),
    ],
    [t],
  )

  return <Table data={data} colDefs={colDefs} />
}
