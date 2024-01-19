import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { Table } from '@/components/common'

import type { MonthlyAmountChangesDataFragment } from '@/api/graphql'

export type MonthlyAmountChangesTableData = MonthlyAmountChangesDataFragment

const columnHelper = createColumnHelper<MonthlyAmountChangesTableData>()

export interface MonthlyAmountChangesTableProps {
  /**
   * Data
   */
  data: MonthlyAmountChangesTableData[]
}

export const MonthlyAmountChangesTable: React.FC<
  MonthlyAmountChangesTableProps
> = ({ data }) => {
  const { t } = useTranslation('report')

  const colDefs = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'Name',
      }),
      ...Array.from({ length: 12 }).map((_, index) => {
        const month = index + 1
        return columnHelper.group({
          id: `${month}`,
          header: t(`MonthlyAmountChangesTable.header.${month}`),
          columns: [
            columnHelper.accessor(
              (row) =>
                row.amountChanges.find(
                  (amountChange) => amountChange.month === month,
                )?.amountChange.debit,
              {
                header: t`MonthlyAmountChangesTable.header.sub.debit`,
                id: `${month}.debit`,
                cell: ({ getValue }) => getValue<number>() ?? 0,
              },
            ),
            columnHelper.accessor(
              (row) =>
                row.amountChanges.find(
                  (amountChange) => amountChange.month === month,
                )?.amountChange.credit,
              {
                header: t`MonthlyAmountChangesTable.header.sub.credit`,
                id: `${month}.credit`,
                cell: ({ getValue }) => getValue<number>() ?? 0,
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
