import { createColumnHelper } from '@tanstack/react-table'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { FormattedDate, Table, LinkButton } from '@/components/common'
import { route } from '@/lib'

import type { GetAccountsQuery } from '@/api/graphql'

export type AccountTableData = GetAccountsQuery['accounts'][number]

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
              className="hover:text-light-accent text-dark-shades flex items-center"
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
            className="text-gray hover:text-light-accent flex items-center"
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
          <LinkButton
            href={{
              pathname: route.accountDetail.pathname,
              query: { id: getValue() },
            }}
            label={t`AccountTable.link.view`}
          />
        ),
      }),
    ],
    [t],
  )

  return <Table data={data} colDefs={colDefs} />
}
