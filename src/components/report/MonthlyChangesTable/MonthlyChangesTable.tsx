import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { FormattedNumber, Table } from '@/components/common'

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
      columnHelper.accessor('name', {
        header: t`MonthlyChangesTable.header.name`,
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
                  <FormattedNumber value={getValue<number>()} />
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
                  <FormattedNumber value={getValue<number>()} />
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
