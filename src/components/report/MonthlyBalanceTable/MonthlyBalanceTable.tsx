import { createColumnHelper } from '@tanstack/react-table'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { FormattedCurrencyNumber, Table } from '@/components/common'
import { route } from '@/shared'

import type { AmountOnMonth, MonthlyAmountDataFragment } from '@/api/graphql'

export type MonthlyBalanceTableData = MonthlyAmountDataFragment

const columnHelper = createColumnHelper<MonthlyBalanceTableData>()

export interface MonthlyBalanceTableProps {
  /**
   * Data
   */
  data?: MonthlyBalanceTableData[]
  /**
   * Loading?
   */
  loading?: boolean
}

export const MonthlyBalanceTable: React.FC<MonthlyBalanceTableProps> = ({
  data,
  loading,
}) => {
  const { t } = useTranslation('report')

  const colDefs = useMemo(
    () => [
      columnHelper.accessor(({ id, name }) => ({ id, name }), {
        header: t`MonthlyBalanceTable.header.name`,
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
        return columnHelper.accessor(
          ({ amounts }) => {
            const { debit = 0, credit = 0 } =
              binarySearch(amounts, month)?.amount ?? {}

            return debit + credit
          },
          {
            header: t(`MonthlyBalanceTable.header.${month}`),
            id: `${month}`,
            cell: ({ getValue }) => (
              <FormattedCurrencyNumber value={getValue<number>()} />
            ),
          },
        )
      }),
    ],
    [t],
  )

  return <Table data={data} colDefs={colDefs} loading={loading} />
}

/**
 * Find the amount on month, equal or the biggest month smaller than the given month
 */
const binarySearch = (amount: Array<AmountOnMonth>, month: number) => {
  let left = 0
  let right = amount.length - 1
  let result = undefined

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)

    if (amount[mid].month === month) {
      return amount[mid]
    } else if (amount[mid].month < month) {
      left = mid + 1
      result = mid
    } else {
      right = mid - 1
    }
  }

  return result != null ? amount[result] : undefined
}
