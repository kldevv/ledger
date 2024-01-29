import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { FormattedDate, Table, ViewLink } from '@/components/common'

import type { GetExchangesQuery } from '@/api/graphql'
import { route } from '@/lib'

export type ExchangeTableData = GetExchangesQuery['getExchanges'][number]

export interface ExchangeTableProps {
  /**
   * Data
   */
  data: ExchangeTableData[]
}

const columnHelper = createColumnHelper<ExchangeTableData>()

export const ExchangeTable: React.FC<ExchangeTableProps> = ({ data }) => {
  const { t } = useTranslation('exchange')

  const colDefs = useMemo(
    () => [
      columnHelper.accessor('origin.accrualDate', {
        header: t`ExchangeTable.header.accrualDate`,
        cell: ({ getValue }) => <FormattedDate dateTime={getValue()} />,
      }),
      columnHelper.accessor('origin.id', {
        header: t`ExchangeTable.header.origin`,
      }),
      columnHelper.accessor('destination.id', {
        header: t`ExchangeTable.header.destination`,
      }),
      columnHelper.accessor('id', {
        header: '',
        cell: ({ getValue }) => (
          <ViewLink
            href={{
              pathname: route.exchangeDetail.pathname,
              query: { id: getValue() },
            }}
          />
        ),
      }),
    ],
    [t],
  )

  return <Table data={data} colDefs={colDefs} />
}
