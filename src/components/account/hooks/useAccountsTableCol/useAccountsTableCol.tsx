import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { TextLink, FormattedDate } from '@/components/core/presentationals'
import { route } from '@/shared/route'

import type { AccountsQuery } from '@/api/graphql'

const columnHelper = createColumnHelper<AccountsQuery['accounts'][number]>()

export const useAccountsTableCol = () => {
  const { t } = useTranslation('account')

  return useMemo(
    () => [
      columnHelper.accessor(({ id, name }) => ({ id, name }), {
        header: t`accountsTable.col.name`,
        cell: ({ getValue }) => (
          <TextLink
            intent="table"
            href={{
              pathname: route.account.details.pathname,
              query: { id: getValue().id },
            }}
          >
            {getValue().name}
          </TextLink>
        ),
      }),
      columnHelper.accessor('group', {
        header: t`accountsTable.col.group`,
        cell: ({ getValue }) => (
          <TextLink
            intent="table"
            href={{
              pathname: route.accountGroup.details.pathname,
              query: { id: getValue().id },
            }}
          >
            {getValue().name}
          </TextLink>
        ),
      }),
      columnHelper.accessor('count', {
        header: t`accountsTable.col.count`,
      }),
      columnHelper.accessor('createdAt', {
        header: t`accountsTable.col.createdAt`,
        cell: ({ getValue }) => <FormattedDate dateTime={getValue()} />,
      }),
      columnHelper.accessor('id', {
        header: t`accountsTable.col.details`,
        enableSorting: false,
        cell: ({ getValue }) => (
          <TextLink
            href={{
              pathname: route.account.details.pathname,
              query: { id: getValue() },
            }}
          >
            {t`accountsTable.view`}
          </TextLink>
        ),
      }),
    ],
    [t],
  )
}
