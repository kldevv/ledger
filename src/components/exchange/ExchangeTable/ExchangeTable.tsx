import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { FormattedDate, Table, ViewLink } from '@/components/common'
import { TreasuryBookDetailLink } from '@/components/treasuryBook'
import { formatCurrencyNumber, route } from '@/lib'

import type { ExchangesQuery } from '@/api/graphql'

export type ExchangeTableData = ExchangesQuery['exchanges'][number]

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
      columnHelper.accessor('destination', {
        header: t`ExchangeTable.header.destination`,
        cell: ({ getValue }) => (
          <TreasuryBookDetailLink treasuryBookId={getValue().treasuryBookId} />
        ),
      }),
      columnHelper.accessor(
        ({ origin, destination }) => ({
          oriAmount: origin.amount,
          destAmount: destination.amount,
        }),
        {
          header: t`ExchangeTable.header.amount`,
          cell: ({ getValue }) => (
            <div>{`${formatCurrencyNumber(
              getValue().oriAmount,
            )} / ${formatCurrencyNumber(getValue().destAmount)}`}</div>
          ),
        },
      ),
      columnHelper.accessor('createdAt', {
        header: t`ExchangeTable.header.createdAt`,
        cell: ({ getValue }) => <FormattedDate dateTime={getValue()} />,
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
