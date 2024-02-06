import { createColumnHelper } from '@tanstack/react-table'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { FormattedCurrencyNumber, Table } from '@/components/common'
import { route } from '@/lib'

import type { MonthlyAmountDataFragment } from '@/api/graphql'

export type MonthlyChangesTableData = MonthlyAmountDataFragment

const columnHelper = createColumnHelper<MonthlyChangesTableData>()

export interface MonthlyChangesTableProps {
  /**
   * Data
   */
  data: MonthlyChangesTableData[]
}

export const MonthlyChangesTable: React.FC<MonthlyChangesTableProps> = ({
  data,
}) => {
  const { t } = useTranslation('report')

  const colDefs = useMemo(
    () => [
      columnHelper.accessor(({ id, name }) => ({ id, name }), {
        header: t`MonthlyChangesTable.header.name`,
        cell: ({ getValue }) => (
          <Link
            href={{
              pathname: route.accountDetail.pathname,
              query: { id: getValue().id },
            }}
            className="hover:text-light-accent"
          >
            {getValue().name}
          </Link>
        ),
      }),
      ...Array.from({ length: 12 }).map((_, index) => {
        const month = index + 1
        return columnHelper.group({
          id: `${month}`,
          header: t(`MonthlyChangesTable.header.${month}`),
          columns: [
            columnHelper.accessor(
              (row) =>
                row.amounts.find((amount) => amount.month === month)?.amount
                  .debit ?? 0,
              {
                header: t`MonthlyChangesTable.header.sub.debit`,
                id: `${month}.debit`,
                cell: ({ getValue }) => (
                  <FormattedCurrencyNumber value={getValue<number>()} />
                ),
              },
            ),
            columnHelper.accessor(
              (row) =>
                row.amounts.find((amount) => amount.month === month)?.amount
                  .credit ?? 0,
              {
                header: t`MonthlyChangesTable.header.sub.credit`,
                id: `${month}.credit`,
                cell: ({ getValue }) => (
                  <FormattedCurrencyNumber value={getValue<number>()} />
                ),
              },
            ),
          ],
        })
      }),
    ],
    [t],
  )

  return <Table data={data} colDefs={colDefs} />
}
