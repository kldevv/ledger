import { createColumnHelper } from '@tanstack/react-table'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { Currency, type CategoryType } from '@/api/graphql'
import {
  CategoryTypeChip,
  FormattedCurrencyNumber,
  Table,
} from '@/components/common'
import { route } from '@/shared'

export interface AccountBalanceTableColumnProps {
  /**
   * Data
   */
  data: AccountBalanceTableRow[]
}

type Base = {
  /**
   * Id
   */
  id: string
  /**
   * Name
   */
  name: string
}

export type AccountBalanceTableRow = {
  /**
   * Category type
   */
  type: CategoryType
  /**
   * Category
   */
  category: Base
  /**
   * Account
   */
  account: Base
  /**
   * Balance
   */
  balance: number
}

const columnHelper = createColumnHelper<AccountBalanceTableRow>()

export const AccountBalanceTableColumn: React.FC<
  AccountBalanceTableColumnProps
> = ({ data }) => {
  const { t } = useTranslation('report')

  const colDefs = useMemo(
    () => [
      columnHelper.accessor('account', {
        header: t`AccountBalanceTableColumn.header.account`,
        cell: ({ getValue }) => (
          <Link
            href={{
              pathname: route.accountDetail.pathname,
              query: {
                id: getValue().id,
              },
            }}
            className="hover:text-light-accent text-dark-shades flex items-center"
          >
            {getValue().name}
          </Link>
        ),
      }),
      columnHelper.accessor('balance', {
        header: t`AccountBalanceTableColumn.header.balance`,
        cell: ({ getValue }) => (
          <FormattedCurrencyNumber value={getValue()} currency={Currency.USD} />
        ),
      }),
      columnHelper.accessor('type', {
        header: t`AccountBalanceTableColumn.header.type`,
        cell: ({ getValue }) => <CategoryTypeChip type={getValue()} />,
      }),
      columnHelper.accessor('category', {
        header: t`AccountBalanceTableColumn.header.category`,
        cell: ({ getValue }) => (
          <Link
            href={{
              pathname: route.categoryDetail.pathname,
              query: {
                id: getValue()?.id,
              },
            }}
            className="text-gray hover:text-light-accent flex items-center"
          >
            {getValue()?.name}
          </Link>
        ),
      }),
    ],
    [t],
  )

  return <Table data={data} colDefs={colDefs} />
}
