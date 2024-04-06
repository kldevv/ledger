import { createColumnHelper } from '@tanstack/react-table'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'

import { useCurrentBranch } from '@/components/core/hooks'
import { FormattedCurrencyNumber } from '@/components/core/presentationals'

import type { TotalOverMonthsQuery } from '@/api/graphql'

const columnHelper =
  createColumnHelper<TotalOverMonthsQuery['totalOverMonths'][number]>()

export const useTotalOverMonthsTableCol = () => {
  const { t } = useTranslation('summary')
  const [currentBranch] = useCurrentBranch()

  return [
    columnHelper.group({
      id: 'name',
      header: '',
      columns: [
        columnHelper.accessor('name', {
          header: t`totalOverMonthsTable.name`,
        }),
      ],
    }),
    ...Array.from({ length: 12 }).map((_, index) => {
      const month = index + 1
      const matchCurrentMonth = new Date().getMonth() === index

      return columnHelper.group({
        id: `${month}`,
        header: () => (
          <span
            className={classNames({
              'text-light-accent': matchCurrentMonth,
            })}
          >
            <span className="mr-1">{t(`totalOverMonthsTable.${month}`)}</span>
            <span>{matchCurrentMonth && t`totalOverMonthsTable.current`}</span>
          </span>
        ),
        columns: [
          columnHelper.accessor(({ total }) => total.at(index)?.debit, {
            header: t`totalOverMonthsTable.debit`,
            id: `${month}.debit`,
            cell: ({ getValue }) => (
              <FormattedCurrencyNumber
                value={getValue<number>()}
                currency={currentBranch?.currency}
              />
            ),
          }),
          columnHelper.accessor(({ total }) => total.at(index)?.credit, {
            header: t`totalOverMonthsTable.credit`,
            id: `${month}.credit`,
            cell: ({ getValue }) => (
              <FormattedCurrencyNumber
                value={getValue<number>()}
                currency={currentBranch?.currency}
              />
            ),
          }),
        ],
      })
    }),
  ]
}
