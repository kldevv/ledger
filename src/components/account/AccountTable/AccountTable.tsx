import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { FormattedDate, Table, ViewLink } from '@/components/common'

import type { GetAccountsQuery } from '@/api/graphql'
import { route } from '@/lib'
import Link from 'next/link'

export type AccountTableData = GetAccountsQuery['getAccounts'][number]

export interface AccountTableProps {
  /**
   * Data
   */
  data: AccountTableData[]
}

const columnHelper = createColumnHelper<AccountTableData>()

export const AccountTable: React.FC<AccountTableProps> = ({ data }) => {
  const { t } = useTranslation('account')

  const colDefs = useMemo(
    () => [
      columnHelper.accessor(
        ({ id, name }) => ({
          id,
          name,
        }),
        {
          header: t`AccountTable.header.name`,
          cell: ({ getValue }) => (
            <Link
              href={{
                pathname: route.accountDetail.pathname,
                query: {
                  id: getValue().id,
                },
              }}
              className="text-dark-shades flex items-center"
            >
              {getValue().name}
            </Link>
          ),
        },
      ),
      columnHelper.accessor('category', {
        header: t`AccountTable.header.category`,
        cell: ({ getValue }) => (
          <Link
            href={{
              pathname: route.categoryDetail.pathname,
              query: {
                id: getValue()?.id,
              },
            }}
            className="text-gray flex items-center"
          >
            {getValue()?.name}
          </Link>
        ),
      }),
      columnHelper.accessor('entryCount', {
        header: t`AccountTable.header.entryCount`,
      }),
      columnHelper.accessor('createdAt', {
        header: t`AccountTable.header.createdAt`,
        cell: (props) => <FormattedDate dateTime={props.getValue()} />,
      }),
      columnHelper.accessor('id', {
        header: '',
        cell: ({ getValue }) => (
          <ViewLink
            href={{
              pathname: route.accountDetail.pathname,
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
