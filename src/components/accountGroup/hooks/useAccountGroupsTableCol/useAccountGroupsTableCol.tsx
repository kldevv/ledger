import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'next-i18next'

import {
  Icon,
  TextLink,
  FormattedDate,
} from '@/components/core/presentationals'
import { route } from '@/shared/route'
import { accountingTypeToOutlineIconName } from '@/shared/utils'

import type { AccountGroupsQuery } from '@/api/graphql'

const columnHelper =
  createColumnHelper<AccountGroupsQuery['accountGroups'][number]>()

export const useAccountGroupsTableCol = () => {
  const { t } = useTranslation('accountGroup')

  return [
    columnHelper.accessor(({ id, name }) => ({ id, name }), {
      header: t`accountGroupsTable.col.name`,
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
    columnHelper.accessor('type', {
      header: t`accountGroupsTable.col.type`,
      cell: ({ getValue }) => (
        <div className="flex items-center gap-x-1">
          <Icon.Outline name={accountingTypeToOutlineIconName(getValue())} />
          {t(`accountingType.${getValue()}`)}
        </div>
      ),
    }),
    columnHelper.accessor('count', {
      header: t`accountGroupsTable.col.count`,
    }),
    columnHelper.accessor('createdAt', {
      header: t`accountGroupsTable.col.createdAt`,
      cell: ({ getValue }) => <FormattedDate dateTime={getValue()} />,
    }),
    columnHelper.accessor('id', {
      header: t`accountGroupsTable.col.details`,
      enableSorting: false,
      cell: ({ getValue }) => (
        <TextLink
          href={{
            pathname: route.accountGroup.details.pathname,
            query: { id: getValue() },
          }}
        >
          {t`accountGroupsTable.view`}
        </TextLink>
      ),
    }),
  ]
}
