import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { FormattedDate, Table, ViewLink } from '@/components/common'

import type { GetExchangesQuery } from '@/api/graphql'
import { route } from '@/lib'
import { TreasuryBookDetailLink } from '@/components/treasuryBook'

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
      columnHelper.accessor('origin', {
        header: t`ExchangeTable.header.origin`,
        cell: ({ getValue }) => (
          <TreasuryBookDetailLink treasuryBookId={getValue().treasuryBookId} />
        ),
      }),
      columnHelper.accessor('origin.amount', {
        header: t`ExchangeTable.header.originAmount`,
      }),
      columnHelper.accessor('destination', {
        header: t`ExchangeTable.header.destination`,
        cell: ({ getValue }) => (
          <TreasuryBookDetailLink treasuryBookId={getValue().treasuryBookId} />
        ),
      }),
      columnHelper.accessor('destination.amount', {
        header: t`ExchangeTable.header.destinationAmount`,
      }),
      columnHelper.accessor('createdAt', {
        header: t`ExchangeTable.header.createdAt`,
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