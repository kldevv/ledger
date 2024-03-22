import { createColumnHelper } from '@tanstack/react-table'
import classNames from 'classnames'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { FormattedCurrencyNumber } from '@/components/core'
import { route } from '@/shared'

import type { TotalDebitAndCreditOverTheMonths } from '@/api/graphql'

const columnHelper = createColumnHelper<TotalDebitAndCreditOverTheMonths>()

export const useTotalDebitAndCreditOverTheMonthsTableColumn = () => {
  const { t } = useTranslation('summary')

  return [
    columnHelper.group({
      id: 'name',
      header: '',
      columns: [
        columnHelper.accessor(({ id, name }) => ({ id, name }), {
          header: t`totalDebitAndCreditOverTheMonthsTableColumn.name`,
          cell: ({ getValue }) => (
            <Link
              href={{
                pathname: route.account.details.pathname,
                query: { id: getValue().id },
              }}
              className="hover:text-light-accent"
            >
              {getValue().name}
            </Link>
          ),
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
            <span className="mr-1">
              {t(`totalDebitAndCreditOverTheMonthsTableColumn.${month}`)}
            </span>
            <span>
              {matchCurrentMonth &&
                t`totalDebitAndCreditOverTheMonthsTableColumn.current`}
            </span>
          </span>
        ),
        columns: [
          columnHelper.accessor(({ total }) => total.at(index)?.debit, {
            header: t`totalDebitAndCreditOverTheMonthsTableColumn.debit`,
            id: `${month}.debit`,
            cell: ({ getValue }) => (
              <FormattedCurrencyNumber value={getValue()} />
            ),
          }),
          columnHelper.accessor(({ total }) => total.at(index)?.credit, {
            header: t`totalDebitAndCreditOverTheMonthsTableColumn.credit`,
            id: `${month}.credit`,
            cell: ({ getValue }) => (
              <FormattedCurrencyNumber value={getValue()} />
            ),
          }),
        ],
      })
    }),
  ]
}
